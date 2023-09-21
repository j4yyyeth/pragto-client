import { useState, useContext } from "react";
import { LoadingContext } from "../context/loading";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { BsCoin, BsThreeDots } from "react-icons/bs";

const Leisure = ({ leisure, i, setShowNotEnough, setShowAdd }) => {
  const [leisureDropdownStates, setLeisureDropdownStates] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, setUser, setPoints, add, setAdd, render, setRender } =
    useContext(LoadingContext);
  const handleDelete = (id, index) => {
    get(`/leisure/delete/${id}`).then((results) => {
      setUser(results.data);
      toggleDropdown(index);
    });
  };
  const handlePoints = (cost, leisureId) => {
    axios
      .put(`${baseUrl}/users/subtract/points/${user._id}`, {
        points: cost,
        leisureId: leisureId,
      })
      .then(() => {
        setRender(!render);
        setAdd(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAdd = (leisureCost, leisureId) => {
    if (!add) {
      if (user.points >= leisureCost) {
        setPoints(leisureCost);
        handlePoints(leisureCost, leisureId);
        setAdd(true);
        setShowAdd(true);
        setTimeout(() => {
          setShowAdd(false);
        }, 5000);
      } else {
        setShowNotEnough(true);
        setTimeout(() => {
          setShowNotEnough(false);
        }, 5000);
      }
    }
  };
  function toggleDropdown(i) {
    const newLeisureDropdownStates = [...leisureDropdownStates];
    newLeisureDropdownStates[i] = !newLeisureDropdownStates[i];
    setLeisureDropdownStates(newLeisureDropdownStates);
    if (activeDropdown !== null && activeDropdown !== i) {
      newLeisureDropdownStates[activeDropdown] = false;
      setLeisureDropdownStates(newLeisureDropdownStates);
    }
    setActiveDropdown(newLeisureDropdownStates[i] ? i : null);
  }

  return (
    <div className="list-item" key={leisure._id}>
      <div className="drop-wrap">
        <p className="pts-flex-p">
          <BsCoin /> <b>{leisure.cost}</b>
        </p>
        <div className="dropdown">
          <button
            className="btn"
            onClick={() => toggleDropdown(i)}
            aria-haspopup="true"
            aria-expanded={leisureDropdownStates[i]}
          >
            <BsThreeDots />
          </button>
          <div
            className={`dropdown-menu${
              leisureDropdownStates[i] ? " show" : ""
            }`}
          >
            <button
              className="dropdown-item plus-btn"
              onClick={() => handleAdd(leisure.cost, leisure._id)}
            >
              <AiOutlinePlusCircle />
            </button>
            <button
              className="dropdown-item delete-btn"
              onClick={() => handleDelete(leisure._id, i)}
            >
              <AiOutlineDelete className="three-icon" />
            </button>
            <Link
              className="dropdown-item edit-btn"
              to={`/leisure-update/${leisure._id}`}
              key={leisure._id}
            >
              <AiOutlineEdit className="three-icon" />
            </Link>
          </div>
        </div>
      </div>
      <div className="list-txt">
        <h4>{leisure.leisure}</h4>
      </div>
    </div>
  );
};

export default Leisure;
