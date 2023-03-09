import { useContext, useState, useEffect } from "react"
import { LoadingContext } from "../context/loading"
import { post, get} from "../services/authService"
import { Link } from "react-router-dom";

const Dashboard = () => {

const { user, setUser, tasks, setTasks, check, setCheck, points, setPoints, leisures } = useContext(LoadingContext)


    const [ newTask, setNewTask ] = useState(
        {
            task: '',
            reward: ''
        }
    )

    const handleChange = (e) => {
        setNewTask((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/todo/create/${user._id}`, newTask)
            .then((results) => {
                let newTasks = [...tasks]
                newTasks.unshift(results.data)
                setTasks(newTasks)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleTaskDelete = (id) => {
        get(`/todo/delete/${id}`)
            .then((results) => {
                setUser(results.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleLeisureDelete = (id) => {
        get(`/leisure/delete/${id}`)
            .then((results) => {
                setUser(results.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // const handleUpdate = (e) => {
    //     //
    // }

    const handleCheck = () => {
        if (check === false) {
            setCheck(true);
            setPoints(points + 1) 
        }                          
    }                              

  return (
    <div>
        <h1>My Dashboard</h1>
        <div className="dashboard-block">
            <form onSubmit={handleSubmit}>
                <div className="input-button">
                    <label>Task</label>
                    <input type="text" name="task" required={true} onChange={handleChange}></input>
                    <label>Points</label>
                    <input type="number" min='0' name="reward" required={true} onChange={handleChange}></input>
                    <button type="submit">Add</button>
                </div>
            </form>
            { user &&
                <>

                { user.tasks?.length ?
                
                user.tasks.map((task, i) => {
                    return (
                            <div className="list-item" key={i}>
                                {/* <input type="checkbox"></input> */}
                                <button className="check-btn" onClick={handleCheck}>✓</button>
                                {
                                    check === true? 
                                    <h4 className="scratched">{task.task}</h4>  // if the checked, use class that scratches with the h4

                                    : <h4>{task.task}</h4>
                                }
                                <p>PTS: {task.reward}</p>
                                <button className="delete-btn" onClick={()=>handleTaskDelete(task._id)}>𝙓</button>
                                {/* later replace X with delete image */}
                                <Link to={`/task-update/${task._id}`} key={task._id}><button>✎</button></Link>
                            </div>
                    ) 
                })

                : <h4>No tasks...</h4>
                
                }

                { user.leisures?.length ?
                
                user.leisures.map((leisure, i) => {
                    return (
                            <div key={i}>
                                <h4>{leisure.leisure}</h4>
                                <button className="delete-btn" onClick={()=>handleLeisureDelete(leisure._id)}>𝙓</button>
                            </div>
                    ) 
                })

                : <h4>No Leisures</h4>
                
                }

                </>
                
            }
        </div>
    </div>
  )
}

export default Dashboard;
