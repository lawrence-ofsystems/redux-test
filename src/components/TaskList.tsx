import React from "react";
import TaskView from "./TaskView";
import Task from "../store/Task";
import {RootState} from "../reducers/rootReducer";
import {connect} from "react-redux";
import {addTaskAction, removeCompletedTasksAction} from "../reducers/taskReducer";
import User from "../store/User";
import {setUserAction} from "../reducers/userReducer";
import {getUserUuid} from "../utils/userUtils";

interface StateProps {
    tasks: Task[]
    user: User | null;
}

interface DispatchProps {
    addTask: (description: string | null, assigneeUuid: string | null) => void,
    removeCompletedTasks: () => void
    setUser: (user: User) => void
}

interface OwnProps {
}

type Props = StateProps & DispatchProps & OwnProps;

const mapState = (state: RootState) => ({
    tasks: state.taskStore.tasks,
    user: state.userStore.user
});

const mapDispatch : DispatchProps = {
    addTask: (description: string | null, assigneeUuid: string | null) => addTaskAction(description, assigneeUuid),
    removeCompletedTasks: () => removeCompletedTasksAction(),
    setUser: (user: User) => setUserAction(user)
};

const TaskList = ({tasks, user, addTask, removeCompletedTasks}: Props) => {
    let incompleteTasks = tasks.filter((task) => !task.completed);
    let completedTasks = tasks.filter((task) => task.completed);
    return (
        <div>
            <h1>Task Tracker</h1>
            <h2>{`Things to Do: ${incompleteTasks.length}`}</h2>
            <button onClick={() => addTask(prompt("Enter new task name", "Take a break"), getUserUuid(user))}>
                Add
            </button>
            <ul>
                {
                    incompleteTasks.map((task: Task) => <TaskView key={task.uuid} task={task}/>)
                }
            </ul>
            <h2>{`Done and Dusted: ${completedTasks.length}`}</h2>
            <button onClick={removeCompletedTasks}>Clear</button>
            {
                completedTasks.map((task: Task) => <TaskView key={ task.uuid } task={ task }/>)
            }
        </div>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mapState, mapDispatch)(TaskList);