import {combineReducers, createStore} from "redux";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    taskStore: taskReducer,
    userStore: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const rootStore = createStore(rootReducer);

export default rootStore;

