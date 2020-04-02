import Task from "../store/Task";
import {appendTask, toggleTaskState, updateTask} from "../utils/taskUtils";
import {TaskAction, TaskActionEnum} from "./taskActions";

const defaultTaskState = {
    tasks: [] as Task[]
};

export type TaskState = typeof defaultTaskState;

function taskReducer(state: TaskState = defaultTaskState, action: TaskAction): TaskState {
    switch (action.type) {
        case TaskActionEnum.AddTask:
            return {
                ...state,
                tasks: appendTask(state.tasks, action.description, action.assigneeUuid)
            };
        case TaskActionEnum.UpdateTask:
            return {
                ...state,
                tasks: updateTask(state.tasks, action.uuid, action.description)
            };
        case TaskActionEnum.ToggleTaskState:
            return {
                ...state,
                tasks: toggleTaskState(state.tasks, action.uuid)
            };
        case TaskActionEnum.RemoveCompletedTasks:
            return {
                ...state,
                tasks: state.tasks.filter((task) => !task.completed)
            };
        default:
            return state;
    }
}

export default taskReducer;