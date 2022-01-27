import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { coins } from "../data/coins";
import Coin from "./Coin";
import BalanceChart from "./BalanceChart";
import { useEffect, useState } from "react";

function Portfolio({ thirdWebTokens, sanityTokens, walletAddress }) {
  const [walletBalance, setWalletBalance] = useState(0);

  const tokenToUsd = {};
  for (const token of sanityTokens) {
    tokenToUsd[token.contractAddress] = Number(token.usdPrice);
  }

  useEffect(() => {
    const calculateTotalBalance = async () => {
      const totalBalance = await Promise.all(
        thirdWebTokens.map(async (token) => {
          const balance = await token.balanceOf(walletAddress);
          return Number(balance.displayValue) * tokenToUsd[token.address];
        })
      );

      setWalletBalance(totalBalance.reduce((acc, cur) => acc + cur, 0));
    };

    return calculateTotalBalance();
  }, [
    thirdWebTokens,
    sanityTokens,
  ]);

  return (
    <Wrapper>
      <Content>
        <Chart>
          <div>
            <BalanceTitle>Portolio balance</BalanceTitle>
            <BalanceValue>
              {"$"}
              {walletBalance.toLocaleString()}
            </BalanceValue>
          </div>
          <BalanceChart />
        </Chart>
        <PortfolioTable>
          <TableItem>
            <Title>Your Assets</Title>
          </TableItem>
          <Divider />
          <Table>
            <TableItem>
              <TableRow>
                <div style={{ flex: 3 }}>Name</div>
                <div style={{ flex: 2 }}>Balance</div>
                <div style={{ flex: 1 }}>Price</div>
                <div style={{ flex: 1 }}>Allocation</div>
                <div style={{ flex: 0 }}>
                  <BsThreeDotsVertical />
                </div>
              </TableRow>
            </TableItem>
            <Divider />
            <div>
              {coins.map((coin, index) => (
                <div key={index}>
                  <Coin coin={coin} />
                  <Divider />
                </div>
              ))}
            </div>
          </Table>
        </PortfolioTable>
      </Content>
    </Wrapper>
  );
}

export default Portfolio;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`;

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem 2rem;
`;

const Balance = styled.div``;

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`;

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`;

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > th {
    text-align: left;
  }
`;

const TableItem = styled.div`
  padding: 1rem 2rem;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
