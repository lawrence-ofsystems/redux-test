import React, {useEffect} from "react";
import TaskView from "./TaskView";
import Task from "../store/Task";
import {RootState} from "../reducers/rootReducer";
import {connect} from "react-redux";
import User from "../store/User";
import {getUserUuid, randomMeToUser} from "../utils/userUtils";
import {addTaskAction, removeCompletedTasksAction} from "../reducers/taskActions";
import {setUserAction} from "../reducers/userActions";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";

interface StateProps {
    tasks: Task[]
    user: User | null;
}

interface DispatchProps {
    addTask: (description: string | null, assigneeUuid: string | null) => void,
    removeCompletedTasks: () => void,
    setUser: (user: User) => void
}

interface OwnProps {
}

type Props = StateProps & DispatchProps & OwnProps;

const mapState = (state: RootState) => ({
    tasks: state.taskStore.tasks,
    user: state.userStore.user
});

const mapDispatch: DispatchProps = {
    addTask: addTaskAction,
    removeCompletedTasks: removeCompletedTasksAction,
    setUser: setUserAction
};

const TaskList = ({tasks, user, addTask, removeCompletedTasks, setUser}: Props) => {
    let incompleteTasks = tasks.filter((task) => !task.completed);
    let completedTasks = tasks.filter((task) => task.completed);
    useEffect(() => {
            fetch('https://randomuser.me/api/')
                .then(res => res.json())
                .then(response => setUser(randomMeToUser(response)))
                .catch(error => console.log("Random user API failed: " + error));
        },
        [setUser]
    );
    return (
        <div>
            <h1>Task Tracker</h1>
            <h2>{`Things to Do: ${incompleteTasks.length}`}</h2>
            <Button
                onClick={() => addTask(prompt("Enter new task name", "Take a break"), getUserUuid(user))}
                disabled={user === null}>
                Add
            </Button>
            <FormGroup>
                {
                    incompleteTasks.map((task: Task) => <TaskView key={task.uuid} task={task}/>)
                }
            </FormGroup>
            <h2>{`Done and Dusted: ${completedTasks.length}`}</h2>
            <Button
                onClick={removeCompletedTasks}
                disabled={completedTasks.length === 0}>
                Clear
            </Button>
            <FormGroup>
                {
                    completedTasks.map((task: Task) => <TaskView key={task.uuid} task={task}/>)
                }
            </FormGroup>
        </div>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(mapState, mapDispatch)(TaskList);