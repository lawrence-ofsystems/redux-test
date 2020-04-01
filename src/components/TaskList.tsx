import React from "react";
import TaskView from "./TaskView";
import Task from "../store/Task";
import {RootState} from "../reducers/rootReducer";
import {connect} from "react-redux";
import {addTaskAction, removeCompletedTasksAction} from "../reducers/taskReducer";

interface StateProps {
    tasks: Task[]
}

interface DispatchProps {
    addTask: (description: string | null) => void,
    removeCompletedTasks: () => void
}

interface OwnProps {
}

type Props = StateProps & DispatchProps & OwnProps;

const mapState = (state: RootState) => ({
    tasks: state.taskStore.tasks
});

const mapDispatch : DispatchProps = {
    addTask: (description: string | null) => addTaskAction(description),
    removeCompletedTasks: () => removeCompletedTasksAction()
};

const TaskList = ({ tasks, addTask, removeCompletedTasks}: Props) => {
    let incompleteTasks = tasks.filter((task) => !task.completed);
    let completedTasks = tasks.filter((task) => task.completed);
    return (
        <div>
            <h1>Task Tracker</h1>
            <h2>{ `Things to Do: ${incompleteTasks.length}` }</h2>
            <button onClick={ () => addTask(prompt("Enter new task name", "Take a break")) }>
                Add
            </button>
            <ul>
                {
                    incompleteTasks.map((task: Task) => <TaskView key={ task.uuid } task={ task }/>)
                }
            </ul>
            <h2>{`Done and Dusted: ${completedTasks.length}`}</h2>
            <button onClick={ removeCompletedTasks }>Clear</button>
            {
                completedTasks.map((task: Task) => <TaskView key={ task.uuid } task={ task }/>)
            }
        </div>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mapState, mapDispatch)(TaskList);