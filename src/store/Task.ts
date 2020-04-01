import {v4 as uuidv4} from 'uuid';

export default class Task {
    readonly uuid: string;
    readonly description: string;
    readonly completed: boolean;
    readonly assigneeUuid: string | null;

    constructor(description: string, assigneeUuid: string | null, completed: boolean = false, uuid?: string) {
        this.uuid = uuid || uuidv4();
        this.description = description;
        this.completed = completed;
        this.assigneeUuid = assigneeUuid;
    }
};