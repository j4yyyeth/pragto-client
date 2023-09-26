import { useContext, useState } from "react";
import { LoadingContext } from "../context/loading";
import { post } from "../services/authService";
import Task from "../components/Task";
import LeisureAdded from "../components/LeisureAdded";
import { BsCoin } from "react-icons/bs";

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
      <div className="dashboard-block">
        <form onSubmit={handleSubmit}>
          <div className="input-buttons">
            <input
              type="text"
              name="task"
              value={newTask.task}
              required={true}
              onChange={handleChange}
              placeholder="Task"
            ></input>
            <input
              type="number"
              name="reward"
              min="1"
              value={newTask.reward}
              required={true}
              onChange={handleChange}
              placeholder="Reward"
            ></input>
            <button className="add-task-btn" type="submit">
              Add Task
            </button>
          </div>
        </form>
        <h4>Tasks</h4>
        {user && (
          <>
            {user.tasks?.length ? (
              <div className="item-container">
                {user.tasks.map((task, i) => {
                  return <Task task={task} i={i} />;
                })}
              </div>
            ) : (
              <p>Let's get productive!</p>
            )}
          </>
        )}
      </div>
      <div className="dashboard-block-leisures">
        <h4>Leisures</h4>
        {user && (
          <>
            {user.leisures?.length ? (
              <div className="item-container">
                {user.leisures.map((leisure, i) => {
                  return <LeisureAdded leisure={leisure} i={i} />;
                })}
              </div>
            ) : (
              <p>Create a leisure and purchase!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
