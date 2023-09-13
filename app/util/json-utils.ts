import * as fs from 'fs';
import path from 'path';

const processedDataDirName = 'processed-data';
const processedDataDirPath = path.join('app', 'data', processedDataDirName);

export function loadJsonFromFileName<T>(fileName: string): T {
    const fileLoc = path.resolve(processedDataDirPath, fileName);
    const fileContents = fs.readFileSync(fileLoc, 'utf8');
    const data = JSON.parse(fileContents);
    return data as T;
}

export function writeJsonToFileLoc<T>(data: T, fileName: string) {
    const fileLoc = path.resolve(processedDataDirPath, 'newItemsFile.json');
    fs.writeFileSync(fileLoc, JSON.stringify(data, null, 2), 'utf8');
}   