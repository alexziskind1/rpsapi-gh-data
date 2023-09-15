import * as fs from 'fs';
import 'dotenv/config';

import { DBConnection } from "./data/weaviate/database";
import { FS_ITEMS_LOC } from './constants';
import { RpsDataClassName } from './data/weaviate/models';



function readDataFromFile(fileLoc: string) {
    return fs.readFileSync(fileLoc, 'utf8');
}

const itemsDataText = readDataFromFile(FS_ITEMS_LOC);
const itemsData = JSON.parse(itemsDataText);

async function load() {
    const db = await DBConnection.createInstanceAsync();

    //await db.ready;

    const i = 0;
    //db.addObject(itemsData[0], 'PtItem');
    await db.addObjectsBatch(itemsData, RpsDataClassName.PtItem);

    const b = i + 1;
    // db.listSchema().then((res: any) => {
    //     console.log('res', res);
    // });

    await db.getTotalObjectCounts().then((res: number) => {
        console.log(res);
    });

    const c = b +1;
}

load();