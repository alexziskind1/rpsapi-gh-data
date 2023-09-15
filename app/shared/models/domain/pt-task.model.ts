import { PtObjectBase } from "./index";

export interface PtTask extends PtObjectBase {
    completed: boolean;
    dateStart?: Date;
    dateEnd?: Date;
}
