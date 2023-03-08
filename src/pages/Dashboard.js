import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LoadingContext } from "../context/loading"
import { post, get} from "../services/authService"

const Dashboard = () => {

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


    const handleDelete = (e) => {
        e.preventDefault()
        get(`todo/delete/${user._id}`)
        console.log(user._id)
    }

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
                user.tasks.map((task, i) => {
                    return (
                        <div className="list-item" key={i}>
                            <button className="check-btn">✔️</button>
                            {/* later replace _/ with check image */}
                            <h4>{task.task}</h4>
                            <p>PTS: {task.reward}</p>
                            <button className="delete-btn" onClick={handleDelete}>𝙓</button>
                            {/* later replace X with delete image */}
                        </div>
                    ) 
                })
                
            }
        </div>
    </div>
  )
}

export default Dashboard;
