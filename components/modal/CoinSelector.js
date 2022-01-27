import styled from "styled-components";
import CoinItem from "./CoinItem";

function CoinSelector({
  setAction,
  selectedToken,
  setSelectedToken,
  sanityTokens,
  thirdWebTokens,
  walletAddress,
}) {
  return (
    <Wrapper>
      <Title>Select a token</Title>
      <CoinList>
        {sanityTokens.map((token) => (
          <CoinItem
            key={token.contractAddress}
            token={token}
            sender={walletAddress}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            thirdWebTokens={thirdWebTokens}
            sanityTokens={sanityTokens}
            setAction={setAction}
          />
        ))}
      </CoinList>
    </Wrapper>
  );
}

export default CoinSelector;

const Wrapper = styled.div``;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CoinList = styled.div`
  display: flex;
  flex-direction: column;
`;
