import SanityClient from "@sanity/client";

export const client = new SanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "v1",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    useCdn: false,
});
