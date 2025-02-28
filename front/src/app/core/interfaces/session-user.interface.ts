import { User } from 'src/app/feature/profile/interfaces/user.interface';

export interface SessionUser {
    token: string,
    userInformation: User
}