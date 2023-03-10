import { useContext, useState } from "react"
import { LoadingContext } from "../context/loading"
import { post, get} from "../services/authService"
import { Link } from "react-router-dom";
import { baseUrl } from "../services/baseUrl";
import axios from "axios";

const Dashboard = () => {

const { user, setUser, tasks, setTasks, check, setCheck, setPoints, setRender, render } = useContext(LoadingContext)


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
            .then(() => {
                setRender(!render)
                console.log(render)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleCheck =  (taskCost, taskId) => {
        if (check === false) {
            setCheck(true);                 
             setPoints(taskCost);
             
            handlePoints(taskCost, taskId)
           
        }
    }                              

  return (
    <div className="dash">
        <div className="shop-text">
            <h3>Welcome to your Dashboard!</h3>
            <p>Here you can create tasks</p>
            <p>When you complete a task, you earn!</p>
        </div>
        <div className="dashboard-block">
            <form onSubmit={handleSubmit}>
                <div className="input-button">
                    <label>Task</label>
                    <input type="text" name="task" value={newTask.task} required={true} onChange={handleChange}></input>
                    <label>Reward</label>
                    <input type="number" name="reward" min='1' value={newTask.reward} required={true} onChange={handleChange}></input>
                    <button type="submit" className="add-task-btn">Add</button>
                </div>
            </form>
            { user &&

                <>


                { user.tasks?.length ?
                user.tasks.map((task, i) => {
                    return (
                            <div className="list-item" key={i}>
                                <div className="list-btns">
                                    <button className="check-btn" onClick={()=>handleCheck(task.reward, task._id)}>✓</button>
                                    <button className="delete-btn" onClick={()=>handleTaskDelete(task._id)}>𝙓</button>
                                    <Link to={`/task-update/${task._id}`} key={task._id}><button className="edit-btn">✎</button></Link>
                                </div>
                                <div className="list-txt">
                                    { 
                                        task.done === true?  
                                        <h4 className="scratched">{task.task}</h4>

                                        : <h4>{task.task}</h4>
                                    }
                                <p>PTS: <b>{task.reward}</b></p>
                                </div>
                            </div>
                    ) 
                })

                : <h4>Let's get stuff done!</h4>
                }
                
                { user.leisures?.length ?
                
                user.leisures.map((leisure, i) => {
                    return (
                        <>
                        {
                            leisure.added === true? 
                            <div className='list-item' key={i}>
                                <h4>LEISURE: {leisure.leisure}</h4>
                                <button className="delete-btn" onClick={()=>handleLeisureDelete(leisure._id)}>𝙓</button>
                            </div>

                            :
                            <></>
                        }
                        </>
                    )
                })

                : <></>
                
                }

                </>
                
            }
        </div>
    </div>
  )
}

export default Dashboard;
