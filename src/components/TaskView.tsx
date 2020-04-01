import React from "react";
import Task from "../store/Task";
import {RootState} from "../reducers/rootReducer";
import {toggleTaskStateAction, updateTaskAction} from "../reducers/taskReducer";
import {connect} from "react-redux";

interface DispatchProps {
    updateTask: (uuid: string, description: string | null) => void,
    toggleTaskState: (uuid: string) => void
}

interface OwnProps {
    task: Task
}

type Props = DispatchProps & OwnProps;

const mapDispatch: DispatchProps = {
    updateTask: (uuid: string, description: string | null) => updateTaskAction(uuid, description),
    toggleTaskState: (uuid: string) => toggleTaskStateAction(uuid)
};

const TaskView = ({ task, updateTask, toggleTaskState }: Props) => {
    return (
        <li onDoubleClick={ () => updateTask(task.uuid, prompt("Edit task description", task.description)) }>
            <input
                type={'checkbox'}
                checked={ task.completed }
                onChange={ () => toggleTaskState(task.uuid) }
            />
            <span>
                { task.description }
            </span>&nbsp;
            <span>
                {task.assigneeUuid
                    ? <small>{task.assigneeUuid}</small>
                    : 'unassigned'
                }
            </span>
        </li>
    );
};

export default connect<{}, DispatchProps, OwnProps, RootState>(null, mapDispatch)(TaskView);