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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                setCheck(false);
                console.log("This is the render:", render)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleCheck =  (taskCost, taskId) => {
        console.log("This is the check:", check);
        if (check === false) {
            setCheck(true);                 
             setPoints(taskCost);
             
            handlePoints(taskCost, taskId)
           
        }
    }
    
    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
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
                    console.log(task.done)
                    return (
                        <div className="list-item" key={i}>
                                <div className="drop-wrap">
                                    <p>PTS: <b>{task.reward}</b></p>
                                    <div className="dropdown">
                                        <button className="btn" onClick={() => toggleDropdown()} aria-haspopup="true" aria-expanded={isDropdownOpen}>⋯</button>
                                        <div className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}>
                                            <button className="dropdown-item check-btn" onClick={()=>handleCheck(task.reward, task._id)}>✓</button>
                                            <button className="dropdown-item delete-btn" onClick={()=>handleTaskDelete(task._id)}>𝙓</button>
                                            <Link className="dropdown-item edit-btn" to={`/task-update/${task._id}`} key={task._id}>✎</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-txt">
                                    { 
                                        task.done === true?  
                                        <h4 className="scratched">{task.task}</h4>

                                        : <h4>{task.task}</h4>
                                    }
                                </div>
                        </div>
                    ) 
                })

                : <h4>Let's get stuff done!</h4>
                }
                
                { user.leisures?.length ?
                
                user.leisures.map((leisure, i) => {
                    return (
                        <div key={i}>
                        {
                            leisure.added === true? 
                            <div className='list-item' key={leisure._id}>
                                <h4>LEISURE: {leisure.leisure}</h4>
                                <button className="delete-btn" onClick={()=>handleLeisureDelete(leisure._id)}>𝙓</button>
                            </div>

                            :
                            <></>
                        }
                        </div>
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
