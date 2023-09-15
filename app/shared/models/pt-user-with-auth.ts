
import { PtUser } from './domain/index';
import { PtUserAuthInfo } from './pt-user-auth-info';

export interface PtUserWithAuth extends PtUser {
    authInfo?: PtUserAuthInfo;
}
