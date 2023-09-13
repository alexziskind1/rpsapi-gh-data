import { PtItem, PtUser } from '../shared/models/domain';
import { GithubIssue } from './models';
import { getNextId, getRandomPriority, getRandomPtItemType, getRandomStatus, getRandomUser } from './utils/data-utils';
import { loadJsonFromFileName, writeJsonToFileLoc } from '../util/json-utils';

const origDataFileName = 'datasets-issues-with-comments.json';


export function loadGHIssues(): GithubIssue[] {
    const data = loadJsonFromFileName<GithubIssue[]>(origDataFileName);
    return data;
}

function getMatchingGhIssue(id: number, allGhIssues: GithubIssue[]) {
    const ghIssue = allGhIssues.find(i => i.id === id);
    return ghIssue;
}

export function mergeCommentsIntoPtItems(allItems: PtItem[], allUsers: PtUser[], allGhIssues: GithubIssue[]) {

    allItems.forEach(i => {
        if (!i.comments)
            i.comments = [];

        if (!i.tasks)
            i.tasks = [];

        i.type = getRandomPtItemType();
        i.priority = getRandomPriority();
        i.status = getRandomStatus();

        const matchingGhIssue = getMatchingGhIssue(i.id, allGhIssues);

        if (matchingGhIssue) {
            matchingGhIssue.comments.forEach(ghc=> {
                i.comments.push({
                    id: getNextId(i.comments.map(obj => obj.id)),
                    title: ghc,
                    dateCreated: new Date(),
                    dateModified: new Date(),
                    user: getRandomUser(allUsers)
                });
            });
        }
        else 
        {
            console.error('No matching issue. Id: ' + i.id);
        }
    });

    const allItemsWithComments = allItems.filter(i=>i.comments.length > 0);

    writeJsonToFileLoc(allItemsWithComments, 'newItemsFile.json');
}
