import {combineReducers, createStore} from "redux";
import taskReducer from "./taskReducer";

export const rootReducer = combineReducers({
    taskStore: taskReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const rootStore = createStore(rootReducer);

export default rootStore;

