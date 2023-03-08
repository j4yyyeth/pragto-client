import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../services/authService";
import axios from "axios";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

  const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    const getTasks = () => {
      get('/todo')
      .then((results) => {
        setTasks(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    const getUser = () => {
      get('/')
    }

    return (
        <LoadingContext.Provider value={{user, setUser, isLoading, setIsLoading, getTasks, tasks, setTasks}}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }

