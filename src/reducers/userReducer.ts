import User from "../store/User";

const defaultUserState = {
    user: null as User | null
};

export type UserState = typeof defaultUserState;

enum UserActionEnum {
    SetUser = 'SET_USER',
}

export type UserAction =
    | { type: UserActionEnum.SetUser; user: User };

export const setUserAction = (user: User): UserAction => ({
    type: UserActionEnum.SetUser,
    user
} as const);

const userReducer = (state: UserState = defaultUserState, action: UserAction): UserState => {
    if (action.type === UserActionEnum.SetUser) {
        return {
            ...state,
            user: action.user
        };
    } else {
        return state;
    }
};

export default userReducer;