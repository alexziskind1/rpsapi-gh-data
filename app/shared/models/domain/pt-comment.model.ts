import { PtObjectBase } from "./pt-object-base.model";
import { PtUser } from "./pt-user.model";

export interface PtComment extends PtObjectBase {
    user: PtUser;
}
