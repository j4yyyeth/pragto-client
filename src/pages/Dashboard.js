import { useContext, useState, useEffect } from "react"
import { LoadingContext } from "../context/loading"
import { post, get} from "../services/authService"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    let { id } = useParams();

    const { user, setUser, tasks, setTasks } = useContext(LoadingContext)


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


    const handleDelete = (id) => {
        get(`/todo/delete/${id}`)
            .then((results) => {
                setUser(results.data)
            })
    }

    // const handleUpdate = (id) => {
    //     put(`/todo/update/${id}`)
    //         .then((results) => {
    //             setUser(results.data)
    //         })
    // }

  return (
    <div>
        <h1>Dashboard</h1>
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
                            <button className="check-btn">✔️</button>
                            {/* later replace _/ with check image */}
                            <h4>{task.task}</h4>
                            <p>PTS: {task.reward}</p>
                            <button className="delete-btn" onClick={()=>handleDelete(task._id)}>𝙓</button>
                            {/* later replace X with delete image */}
                            <button onClick={()=>handleUpdate(task._id)}>✎</button>
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
