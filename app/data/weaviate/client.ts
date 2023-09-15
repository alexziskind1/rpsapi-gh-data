import weaviate, { WeaviateClient } from "../../../node_modules/weaviate-ts-client/dist/index";


export function createNewClient(): WeaviateClient {
    const client = weaviate.client({
        scheme: 'https',
        host: process.env['WCS_HOST'] as string,
        apiKey: new weaviate.ApiKey(process.env['WCS_ADMIN_KEY'] as string),
        headers: {
            "X-OpenAI-Api-Key": process.env['OPENAI_APIKEY'] as string,
        },
    });
    return client;
}