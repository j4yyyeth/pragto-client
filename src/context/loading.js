import { useState, createContext } from "react";
import { get, post } from "../services/authService";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [leisures, setLeisures] = useState([]);
    const [points, setPoints] = useState(0);
    const [check, setCheck] = useState(false);
    const [add, setAdd] = useState(false);
    const [render, setRender] = useState(false)

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

    // const getPoints = () => { 
    //   get('/users/points')
    //   .then((results) => {
    //     setPoints(results.data)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // }

    return (
        <LoadingContext.Provider value={{render, setRender, user, setUser, isLoading, setIsLoading, getTasks, tasks, setTasks, getLeisures, leisures, setLeisures, points, setPoints, check, setCheck, add, setAdd}}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }