import User from "../store/User";
import {UserAction, UserActionEnum} from "./userActions";

const defaultUserState = {
    user: null as User | null
};

export type UserState = typeof defaultUserState;

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