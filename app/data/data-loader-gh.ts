import { PtItem, PtUser } from '../shared/models/domain';
import { GithubIssue } from './models';
import { getNextId, getRandomPriority, getRandomPtItemType, getRandomUser } from './utils/data-utils';
import { loadJsonFromFileName, writeJsonToFileLoc } from '../util/json-utils';

const origDataFileName = 'datasets-issues-with-comments.json';

export function loadGHIssues(): GithubIssue[] {
    const data = loadJsonFromFileName<GithubIssue[]>(origDataFileName);
    //console.log(data);
    return data;
}