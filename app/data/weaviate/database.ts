
import { WeaviateClient, Property, WhereFilter } from '../../../node_modules/weaviate-ts-client/dist/index';
import { PtItem } from '../../shared/models/domain/pt-item.model';
import { createNewClient } from './client';

import { RpsDataClassName, WPtItem, rpsPtItemProps } from './models';
import { WResponseTypeCount, wNearTextSearch, wNearTextSearchFiltered } from './query';


export class DBConnection {

    private client: WeaviateClient;
    //public ready: Promise<any>;

    private constructor(client?: WeaviateClient) {
        if (client == null || client == undefined) {
            client = createNewClient();
        }
        this.client = client!;
    }
  
    public static createInstanceAsync = async (client?: WeaviateClient) => {
        const instance = new DBConnection(client);
        await ensureClasses(instance.client);
        return instance;
    };

    // constructor(client?: WeaviateClient) {
    //     if (client == null || client == undefined) {
    //         client = createNewClient();
    //     }
    //     this.client = client;

    //     this.ready = new Promise((resolve, reject) => {
    //         ensureClasses(this.client)
    //             .then(res => {
    //                 resolve(res);
    //             })
    //             .catch(err => {
    //                 reject(err);
    //             });
    //     });

    //     //ensureClasses(this.client);
    // }

    async listSchema(): Promise<any> {
        return this.client
            .schema
            .getter()
            .do()
            .then((res: any) => {
                //console.dir(res, { depth: 6 });
                return res;
            })
            .catch((err: any) => {
                console.error(err)
            });
    }

    async getTotalObjectCounts(): Promise<number> {
        const ptItemCount = getClassCount(this.client, RpsDataClassName.PtItem);
        return ptItemCount;
    }


    async addObject(data: PtItem, className: RpsDataClassName): Promise<any> {
        const result = await this.client.data
            .creator()
            .withClassName(className)
            .withProperties({
                ptItemId: data.id,
                title: data.title,
                description: data.description,
            })
            .do()
            .then((res: any) => {
                //console.dir(res, { depth: 6 });
                return res;
            })
            .catch((err: any) => {
                console.error(err)
            });
        return result;
    }

    async addObjectsBatch(items: PtItem[], className: RpsDataClassName): Promise<any> {
        // Prepare a batcher
        let batcher = this.client.batch.objectsBatcher();
        let counter = 0;

        items.forEach((item) => {
            // add the object to the batch queue
            batcher = batcher.withObject({
                class: className,
                properties: {
                    ptItemId: item.id,
                    title: item.title,
                    description: item.description,
                    type: item.type,
                    status: item.status,
                    assigneeId: item.assignee.id,
                    dateCreated: item.dateCreated,
                    dateModified: item.dateModified,
                    priority: item.priority,
                    estimate: item.estimate,
                }
            });

            // When the batch counter reaches 20, push the objects to Weaviate
            if (counter++ == 100) {
            // flush the batch queue
            batcher
                .do()
                .then((res) => {
                //console.log(res);
                })
                .catch((err) => {
                console.error(err);
                });

            // restart the batch queue
            counter = 0;
            batcher = this.client.batch.objectsBatcher();
            }
        });

        // Flush the remaining objects
        const result = batcher
            .do()
            .then((res) => {
            //console.log(res);
            })
            .catch((err) => {
            console.error(err);
            });

        return result;



        // let batcher5 = this.client.batch.objectsBatcher();
        // for (const dataObj of data)

        //     batcher5 = batcher5.withObject({
        //         class: className,
        //         properties: {
        //             ptItemId: dataObj.id,
        //             title: dataObj.title,
        //             description: dataObj.description,
        //             type: dataObj.type,
        //             status: dataObj.status,
        //             assigneeId: dataObj.assignee.id,
        //             dateCreated: dataObj.dateCreated,
        //             dateModified: dataObj.dateModified,
        //             priority: dataObj.priority,
        //             estimate: dataObj.estimate,
        //         }
        //     });

        // // Flush
        // const result = await batcher5.do()
        //     .then((res: any) => {
        //         //console.dir(res, { depth: 6 });
        //         return res;
        //     })
        //     .catch((err: any) => {
        //         console.error(err)
        //     });

        //return result;
    }

    async deleteAllData() {
        await this.client
            .schema
            .deleteAll()
            .then((res: any) => {
                //console.dir(res, { depth: 6 });
            })
            .catch((err: any) => {
                console.error(err)
            });
    }

    async queryPtItems(searchTerm: string) {
        const fields = rpsPtItemProps.map(p => p.name).join(' ');
        return wNearTextSearch<WPtItem>(this.client, RpsDataClassName.PtItem, fields, searchTerm);
    }

    async queryPtItemsFiltered(searchTerm: string, filterPath: string, filterString?: string, filterNumber?: number) {
        const fields = rpsPtItemProps.map(p => p.name).join(' ');
        let filter: WhereFilter | undefined = undefined;
        if (filterString != null && filterString != undefined && filterString != '') {
            filter = {
                path: [filterPath],
                operator: 'Equal',
                valueString: filterString
            };
        } else if (filterNumber != null && filterNumber != undefined) {
            filter = {
                path: [filterPath],
                operator: 'Equal',
                valueInt: filterNumber
            };
        }

        if (filter == null || filter == undefined) {
            return wNearTextSearch<WPtItem>(this.client, RpsDataClassName.PtItem, fields, searchTerm);
        } else {
            return wNearTextSearchFiltered<WPtItem>(this.client, RpsDataClassName.PtItem, fields, filter, searchTerm);
        }
    }

}


async function ensureClasses(client: WeaviateClient) {
    const classNameExists = await client.schema.exists(RpsDataClassName.PtItem);

    if (classNameExists) {
        console.log(`Class ${RpsDataClassName.PtItem} exists`);
    } else {
        console.log(`Class ${RpsDataClassName.PtItem} doesn't exist, creating it`);
        await createClassDefinition(client, RpsDataClassName.PtItem, rpsPtItemProps);
    }
}

async function getClassCount(client: WeaviateClient, className: RpsDataClassName): Promise<number> {
    const countResult = await client.graphql
                    .aggregate()
                    .withClassName(className)
                    .withFields('meta { count }')
                    .do()
                    .then((res: WResponseTypeCount) => {
                        //console.dir(res, { depth: 6 });
                        return res.data.Aggregate.PtItem[0].meta.count;
                    });
    return countResult;
}

async function createClassDefinition(client: WeaviateClient, className: RpsDataClassName, rpsPtItemProps: Property[]) {
    console.log(`Creating class ${className}`);

    const properties = rpsPtItemProps.map(p => {    
        return {
            name: p.name,
            dataType: p.dataType
        }
    });
    console.log('properties', properties);

    let result = await client
        .schema
        .classCreator()
        .withClass({
            class: className,
            vectorizer: 'text2vec-openai',
            properties: properties,
            moduleConfig: {
                "text2vec-openai": {
                    "vectorizeClassName": true
                }
            }
        })
        .do();

        return result;
}

