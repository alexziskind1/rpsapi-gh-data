import { Property } from "../../../node_modules/weaviate-ts-client/dist/index";
import { PriorityEnum } from "../../shared/models/domain/enums/item-priority.enum";
import { StatusEnum } from "../../shared/models/domain/enums/item-status.enum";
import { PtItem } from "../../shared/models/domain/index";
import { PtUser } from "../../shared/models/domain/pt-user.model";
import { PtItemType } from "../../shared/models/domain/types/pt-item-type";


export enum RpsDataClassName {
    PtItem = "PtItem",
    PtUser = "PtUser",
    PtComment = "PtComment",
    PtTask = "PtTask",
}

export const rpsPtItemProps: Property[] = [
    { name: 'ptItemId', dataType: ['int'] },
    { name: 'title', dataType: ['text'] },
    { name: 'description', dataType: ['text'] },
    { name: 'type', dataType: ['text'] },
    { name: 'status', dataType: ['text'] },
    { name: 'assigneeId', dataType: ['int'] },
    { name: 'dateCreated', dataType: ['text'] },
    { name: 'dateModified', dataType: ['text'] },
    { name: 'priority', dataType: ['text'] },
    { name: 'estimate', dataType: ['int'] },
];


export type WPtItem = {
    ptItemId: number;
    title: string;
    description: string;
    type: PtItemType;
    status: StatusEnum;
    assigneeId: number;
    dateCreated: Date;
    dateModified: Date;
    priority: PriorityEnum;
    estimate: number;
};

export function wPtItemsToPtItems(wPtItems: WPtItem[], allUsers: PtUser[]): PtItem[] {
    return wPtItems.map(w=>wPtItemToPtItem(w, allUsers));
}


export function wPtItemToPtItem(wPtItem: WPtItem, allUsers: PtUser[]): PtItem {

    let assignee = allUsers.find(u=>u.id === wPtItem.assigneeId);

    const ptItem: PtItem = {
        id: wPtItem.ptItemId,
        type: wPtItem.type,
        status: wPtItem.status,
        title: wPtItem.title,
        description: wPtItem.description,
        dateCreated: wPtItem.dateCreated,
        dateModified: wPtItem.dateModified,
        estimate: wPtItem.estimate,
        priority: wPtItem.priority,
        comments: [],
        tasks: [],
        assignee: assignee!
    };

    return ptItem;

}