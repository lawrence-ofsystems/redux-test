import React from "react";
import Task from "../store/Task";
import {RootState} from "../reducers/rootReducer";
import {connect} from "react-redux";
import {toggleTaskStateAction, updateTaskAction} from "../reducers/taskActions";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditIcon from "@material-ui/icons/Edit"

interface DispatchProps {
    updateTask: (uuid: string, description: string | null) => void,
    toggleTaskState: (uuid: string) => void
}

interface OwnProps {
    task: Task
}

type Props = DispatchProps & OwnProps;

const mapDispatch: DispatchProps = {
    updateTask: updateTaskAction,
    toggleTaskState: toggleTaskStateAction
};

const TaskView = ({task, updateTask, toggleTaskState}: Props) => {
    let assignee: string = task.assigneeUuid ? task.assigneeUuid : 'unassigned';
    return (
        <Box>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={task.completed}
                        onChange={() => toggleTaskState(task.uuid)}
                    />
                }
                label={`${task.description} (${assignee})`}
            >
            </FormControlLabel>
            <IconButton
                onClick={() => updateTask(task.uuid, prompt("Edit task description", task.description))}
                edge='start'
            >
                <EditIcon/>
            </IconButton>
        </Box>
    );
};

export default connect<{}, DispatchProps, OwnProps, RootState>(null, mapDispatch)(TaskView);