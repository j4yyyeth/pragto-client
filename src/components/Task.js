import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { LoadingContext } from "../context/loading";
import { get } from "../services/authService";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { BsCoin, BsThreeDots } from "react-icons/bs";

const Task = ({ task, i }) => {
  const [taskDropdownStates, setTaskDropdownStates] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, setUser, check, setCheck, setPoints, setRender, render } =
    useContext(LoadingContext);
  const handleTaskDelete = (id, index) => {
    get(`/todo/delete/${id}`)
      .then((results) => {
        setUser(results.data);
        toggleDropdown(index);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePoints = (reward, taskId) => {
    axios
      .put(`${baseUrl}/users/update/points/${user._id}`, {
        points: reward,
        taskId: taskId,
      })
      .then(() => {
        setRender(!render);
        setCheck(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function toggleDropdown(i) {
    const newTaskDropdownStates = [...taskDropdownStates];
    newTaskDropdownStates[i] = !newTaskDropdownStates[i];
    setTaskDropdownStates(newTaskDropdownStates);

    if (activeDropdown !== null && activeDropdown !== i) {
      newTaskDropdownStates[activeDropdown] = false;
      setTaskDropdownStates(newTaskDropdownStates);
    }
    setActiveDropdown(newTaskDropdownStates[i] ? i : null);
  }

  const handleCheck = (taskCost, taskId) => {
    if (check === false) {
      setCheck(true);
      setPoints(taskCost);

      handlePoints(taskCost, taskId);
    }
  };
  return (
    <div className="list-item" key={i}>
      <div className="drop-wrap">
        <p className="pts-flex-p">
          <BsCoin /> <b>{task.reward}</b>
        </p>
        <div className="dropdown">
          <div className="three-dots-vis">
            <button
              className="btn"
              onClick={() => toggleDropdown(i)}
              aria-haspopup="true"
              aria-expanded={taskDropdownStates[i]}
            >
              <BsThreeDots />
            </button>
          </div>
          <div
            className={`dropdown-menu${taskDropdownStates[i] ? " show" : ""}`}
          >
            <button
              className="dropdown-item check-btn"
              onClick={() => handleCheck(task.reward, task._id)}
            >
              <AiOutlineCheckCircle className="three-icon" />
            </button>
            <button
              className="dropdown-item delete-btn"
              onClick={() => handleTaskDelete(task._id, i)}
            >
              <AiOutlineDelete className="three-icon" />
            </button>
            <Link
              className="dropdown-item edit-btn"
              to={`/task-update/${task._id}`}
              key={task._id}
            >
              <AiOutlineEdit className="three-icon" />
            </Link>
          </div>
        </div>
      </div>
      <div className="list-item-txt">
        {task.done === true ? (
          <h4 className="scratched">{task.task}</h4>
        ) : (
          <h4 className="task-text">{task.task}</h4>
        )}
      </div>
    </div>
  );
};

export default Task;
