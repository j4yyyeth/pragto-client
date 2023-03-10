import { useContext, useState, useEffect } from "react"
import { LoadingContext } from "../context/loading"
import { post, get} from "../services/authService"
import { Link } from "react-router-dom";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";

const Dashboard = () => {

const { user, setUser, tasks, setTasks, check, setCheck, points, setPoints, setRender, render } = useContext(LoadingContext)


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
                setNewTask({task: "", reward: ""})
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

    const handlePoints = (reward, taskId) => {
        axios.put(`${baseUrl}/users/update/points/${user._id}`, {points: reward, taskId: taskId})
            .then((results) => {
                setRender(!render)
                console.log(results)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleCheck =  (taskCost, taskId) => { // if task model done = false, set it to true, and if true, scratch out task
        if (check === false) {
            setCheck(true);                 
             setPoints(taskCost);
             
            handlePoints(taskCost, taskId)
           
        }
        
        // if (tasks.done === false) {
        //     setCheck(true);
        //      or set the tasks done to true
    
        //     setPoints(userPoints + taskCost);
        // }
    }                              

  return (
    <div>
        <h1>My Dashboard</h1>
        <div className="dashboard-block">
            <form onSubmit={handleSubmit}>
                <div className="input-button">
                    <label>Task</label>
                    <input type="text" name="task" value={newTask.task} required={true} onChange={handleChange}></input>
                    <label>Points</label>
                    <input type="number" name="reward" min='0' value={newTask.reward} required={true} onChange={handleChange}></input>
                    <button type="submit">Add</button>
                </div>
            </form>
            { user &&

                <>
                {user.points ? <><p>State Points: {points}</p> <p>Users Points: {user.points}</p></> : <p>0</p>} 
                {/* need a way to set the state of points to the users points */}


                { user.tasks?.length ?
                user.tasks.map((task, i) => {
                    return (
                            <div className="list-item" key={i}>
                                {/* <input type="checkbox"></input> */}
                                <button className="check-btn" onClick={()=>handleCheck(task.reward, task._id)}>✓</button>
                                {   // {task.done} === true? // this will make sure a specific task is done or not 
                                    task.done === true? 
                                    <h4 className="scratched">{task.task}</h4>

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
                
                // conditional here to check if the leisure has been added
                user.leisures.map((leisure, i) => {
                    return (
                            <div className='list-item' key={i}>
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
