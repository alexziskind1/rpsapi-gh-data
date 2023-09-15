import { PriorityEnum, StatusEnum } from "./enums/index";
import { PtComment, PtObjectBase, PtTask, PtUser } from "./index";
import { PtItemType } from "./types/index";


export interface PtItem extends PtObjectBase {
    description?: string;
    type: PtItemType;
    estimate: number;
    priority: PriorityEnum;
    status: StatusEnum;
    assignee: PtUser;
    tasks: PtTask[];
    comments: PtComment[];
}
