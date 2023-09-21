import { useContext, useState } from "react";
import { LoadingContext } from "../context/loading";
import { post } from "../services/authService";
import Task from "../components/Task";
import LeisureAdded from "../components/LeisureAdded";

const Dashboard = () => {
  const { user, tasks, setTasks } = useContext(LoadingContext);
  const [newTask, setNewTask] = useState({
    task: "",
    reward: "",
  });
  const handleChange = (e) => {
    setNewTask((recent) => ({ ...recent, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/todo/create/${user._id}`, newTask)
      .then((results) => {
        let newTasks = [...tasks];
        newTasks.unshift(results.data);
        setTasks(newTasks);
        setNewTask({ task: "", reward: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dash">
      <div className="shop-text">
        <h3>Welcome to your Dashboard</h3>
        <p>Create a task and start earning!</p>
      </div>
      <div className="dashboard-block">
        <form onSubmit={handleSubmit}>
          <div className="input-button">
            <label>Task</label>
            <input
              type="text"
              name="task"
              value={newTask.task}
              required={true}
              onChange={handleChange}
            ></input>
            <label>Reward</label>
            <input
              type="number"
              name="reward"
              min="1"
              value={newTask.reward}
              required={true}
              onChange={handleChange}
            ></input>
            <button className="add-task-btn" type="submit">
              Add Task
            </button>
          </div>
        </form>
        {user && (
          <>
            {user.tasks?.length ? (
              user.tasks.map((task, i) => {
                return <Task task={task} i={i} />;
              })
            ) : (
              <h4>Let's get Productive!</h4>
            )}
            {user.leisures?.length ? (
              user.leisures.map((leisure, i) => {
                return <LeisureAdded leisure={leisure} i={i} />;
              })
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
