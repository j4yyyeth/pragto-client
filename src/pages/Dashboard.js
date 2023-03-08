import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoadingContext } from "../context/loading"
import { post } from "../services/authService"

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

                console.log(user)

            })
            .catch((err) => {
                console.log(err)
            })
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
                    <input type="number" name="reward" required={true} onChange={handleChange}></input>
                    <button type="submit">Add</button>
                </div>
            </form>
            {
                user.tasks.map((task, i) => {
                    return (
                        <div className="list-item" key={i}>
                            <h2>{task.task}</h2>
                            <h4>{task.reward}</h4>
                        </div>
                    ) 
                })
                
            }
        </div>
    </div>
  )
}

export default Dashboard;
