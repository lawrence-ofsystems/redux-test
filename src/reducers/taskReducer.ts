import Task from "../store/Task";
import {appendTask, toggleTaskState, updateTask} from "../utils/taskUtils";

const defaultTaskState = {
    tasks: [] as Task[]
};

export type TaskState = typeof defaultTaskState;

enum TaskActionEnum {
    AddTask = 'ADD_TASK',
    UpdateTask = 'UPDATE_TASK',
    ToggleTaskState = 'TOGGLE_TASK_STATE',
    RemoveCompletedTasks = 'REMOVE_COMPLETED_TASKS'
}

export type TaskAction =
    | { type: TaskActionEnum.AddTask; description: string | null; assigneeUuid: string | null; }
    | { type: TaskActionEnum.UpdateTask; uuid: string; description: string | null; }
    | { type: TaskActionEnum.ToggleTaskState; uuid: string; }
    | { type: TaskActionEnum.RemoveCompletedTasks; };

export const addTaskAction = (description: string | null, assigneeUuid: string | null): TaskAction => ({
    type: TaskActionEnum.AddTask,
    description,
    assigneeUuid
} as const);
export const updateTaskAction = (uuid: string, description: string | null): TaskAction => ({
    type: TaskActionEnum.UpdateTask,
    uuid,
    description
} as const);
export const toggleTaskStateAction = (uuid: string): TaskAction => ({
    type: TaskActionEnum.ToggleTaskState,
    uuid
} as const);
export const removeCompletedTasksAction = (): TaskAction => ({type: TaskActionEnum.RemoveCompletedTasks} as const);

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