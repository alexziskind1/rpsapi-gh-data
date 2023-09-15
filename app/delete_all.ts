import 'dotenv/config';
//import '../../../node_modules/dotenv/config';

import { DBConnection } from "./data/weaviate/database";


async function runDelete() {
    const db = await DBConnection.createInstanceAsync();
    db.deleteAllData();
}

runDelete();