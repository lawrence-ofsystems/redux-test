export enum TaskActionEnum {
    AddTask = 'ADD_TASK',
    UpdateTask = 'UPDATE_TASK',
    ToggleTaskState = 'TOGGLE_TASK_STATE',
    RemoveCompletedTasks = 'REMOVE_COMPLETED_TASKS'
}

export type TaskAction =
    { type: TaskActionEnum.AddTask; description: string | null; assigneeUuid: string | null; } |
    { type: TaskActionEnum.UpdateTask; uuid: string; description: string | null; } |
    { type: TaskActionEnum.ToggleTaskState; uuid: string; } |
    { type: TaskActionEnum.RemoveCompletedTasks; };

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

