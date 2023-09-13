import { PtComment, PtItem, PtUser } from '../shared/models/domain';
import { getRandomDateBetween, getRandomDateWithinLastYear } from './utils/data-utils';
import { loadJsonFromFileName } from '../util/json-utils';

const usersFileName = 'fs-users.json';
const itemsFileName = 'fs-items.json';


export function loadUsers(): PtUser[] {
    const usersData = loadJsonFromFileName<PtUser[]>(usersFileName);
    return usersData;
}

function ensureItemTasksAndComments(item:PtItem) {
    if (!item.comments)
        item.comments = [];
    if (!item.tasks)
        item.tasks = [];
}



function updateItemDates(item:PtItem) {
    const date = getRandomDateWithinLastYear();
    item.dateCreated = date;
    item.dateModified = date;
}

function updateItemCommentsDates(item:PtItem) {
    item.comments.forEach(c=>{
        const date = getRandomDateBetween(item.dateCreated, new Date());
        c.dateCreated = date;
        c.dateModified = date;
    });
}

function updateItemTasksDates(item:PtItem) {
    item.tasks.forEach(t=>{
        const date = getRandomDateBetween(item.dateCreated, new Date());
        t.dateCreated = date;
        t.dateModified = date;
    });
}

export function loadItems(): PtItem[] {
    const itemsData = loadJsonFromFileName<PtItem[]>(itemsFileName);

    //console.log('itemsData', itemsData);

    itemsData.forEach(i=>{
        ensureItemTasksAndComments(i);
        updateItemDates(i);
        updateItemCommentsDates(i);
        updateItemTasksDates(i);
    });

    return itemsData;
}
