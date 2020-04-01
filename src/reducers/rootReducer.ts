import {combineReducers, createStore} from "redux";
import taskReducer, {TaskState} from "./taskReducer";

export const rootReducer = combineReducers({
    taskStore: taskReducer
});

//export type RootState = ReturnType<typeof rootReducer>;
export type RootState = TaskState;

const rootStore = createStore(taskReducer);

export default rootStore;

