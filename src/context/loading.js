import { useState, createContext } from "react";
import { get, post } from "../services/authService";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [leisures, setLeisures] = useState([]);

    const getTasks = () => {
      get('/todo')
      .then((results) => {
        setTasks(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    const getLeisures = () => {
      get('/leisure')
      .then((results) => {
        setLeisures(results.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    return (
        <LoadingContext.Provider value={{user, setUser, isLoading, setIsLoading, getTasks, tasks, setTasks, getLeisures, leisures, setLeisures}}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }