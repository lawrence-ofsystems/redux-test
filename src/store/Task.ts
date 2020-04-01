import User from "./User";
import { v4 as uuidv4 } from 'uuid';

export default class Task {
    readonly uuid: string;
    readonly description: string;
    readonly completed: boolean;
    readonly assignee?: User;

    constructor(description: string, completed: boolean = false, assignee?: User, uuid?: string) {
        this.uuid = uuid || uuidv4();
        this.description = description;
        this.completed = completed;
        this.assignee = assignee;
    }
};