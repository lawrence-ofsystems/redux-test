import User from "../store/User";

export enum UserActionEnum {
    SetUser = 'SET_USER',
}

export type UserAction = { type: UserActionEnum.SetUser; user: User };

export const setUserAction = (user: User): UserAction => ({
    type: UserActionEnum.SetUser,
    user: user
} as const);

