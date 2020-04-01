import Task from "../store/Task";

const findTaskIndex = (tasks: Task[], uuid: string): number => {
    return tasks.findIndex((task) => task.uuid === uuid);
};

const replaceTaskAtIndex = (tasks: Task[], task: Task, idx: number): Task[] => {
    let modified = tasks.slice(0, idx);
    modified.push(task);
    return modified.concat(tasks.slice(idx + 1));
};

export const appendTask = (tasks: Task[], description: string | null, assigneeUuid: string | null): Task[] => {
    return description ? tasks.concat([new Task(description, assigneeUuid)]) : tasks;
};

export const updateTask = (tasks: Task[], uuid: string, description: string | null): Task[] => {
    let idx = findTaskIndex(tasks, uuid);
    if (description && idx >= 0) {
        let match = tasks[idx];
        let task = new Task(description, match.assigneeUuid, match.completed, match.uuid);
        return replaceTaskAtIndex(tasks, task, idx)
    } else {
        return tasks;
    }
};

export const toggleTaskState = (tasks: Task[], uuid: string): Task[] => {
    let idx = findTaskIndex(tasks, uuid);
    if (idx >= 0) {
        let match = tasks[idx];
        let task = new Task(match.description, match.assigneeUuid, !match.completed, match.uuid);
        return replaceTaskAtIndex(tasks, task, idx)
    } else {
        return tasks;
    }
};