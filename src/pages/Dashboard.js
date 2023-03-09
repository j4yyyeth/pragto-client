import { useContext, useState, useEffect } from "react"
import { LoadingContext } from "../context/loading"
import { post, get} from "../services/authService"
import { Link } from "react-router-dom";

const Dashboard = () => {

const { user, setUser, tasks, setTasks, check, setCheck, points, setPoints } = useContext(LoadingContext)


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
                console.log(newTasks)
                newTasks.unshift(results.data)
                setTasks(newTasks) // trying to get tasks to populate right away
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleDelete = (id) => {
        get(`/todo/delete/${id}`)
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
            setPoints(points + 1)  // have to click twice to set to true for some reason
        }                          // also need to save it .. when refreshed the check goes away
    }                              // when checked it checks all the other tasks as well 

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
                                <button className="delete-btn" onClick={()=>handleDelete(task._id)}>𝙓</button>
                                {/* later replace X with delete image */}
                                <Link to={`/task-update/${task._id}`} key={task._id}><button>✎</button></Link>
                            </div>
                    ) 
                })

                : <h4>No tasks...</h4>
                
                }


                </>
                
            }
        </div>
    </div>
  )
}

export default Dashboard;
