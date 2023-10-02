
import { WeaviateClient, WhereFilter } from '../../../node_modules/weaviate-ts-client/dist/index';
import { RpsDataClassName } from './models';

export type WResponseTypeCount = {
    data: {
      Aggregate: {
        [key in RpsDataClassName]: [
          {
            meta: {
              count: number;
            };
          }
        ];
      };
    };
};

export type WResponseQuery<T> = {
    data: {
      Get: {
        [key in RpsDataClassName]: T[];
      };
    };
};



export async function wNearTextSearch<T>(client: WeaviateClient, className: RpsDataClassName, fields: string, searchTerm: string): Promise<WResponseQuery<T>> {

    const result = client.graphql
            .get()
            .withClassName(className)
            .withNearText({ concepts: [searchTerm] })
            .withLimit(20)
            .withFields(fields)
            .do();

    return result;
}

export async function wNearTextSearchFiltered<T>(client: WeaviateClient, className: RpsDataClassName, fields: string, filter: WhereFilter, searchTerm: string): Promise<WResponseQuery<T>> {

    const result = client.graphql
            .get()
            .withClassName(className)
            .withNearText({ concepts: [searchTerm] })
            .withLimit(20)
            .withFields(fields)
            .withWhere(filter)
            .do();

    return result;
}