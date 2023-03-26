import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { LoadingContext } from "../context/loading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"

const TaskUpdate = () => {
    const navigate = useNavigate();
    const { user, setTasks } = useContext(LoadingContext)
    const { taskId } = useParams()

    const [ thisTask, setThisTask ] = useState(null)

    useEffect(() => {
        if (user && user.tasks) {
            let task = user.tasks.find((task) => task._id === taskId)
            setThisTask(task)
        }
    }, [user, taskId]) 

    const handleChange = (e) => {
        setThisTask((recent) => ({...recent, [e.target.name]:e.target.value}));
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${baseUrl}/todo/update/${thisTask._id}`, thisTask)
            .then((updated) => {
                setThisTask(updated);
                console.log(updated);
                setTasks(previous => [
                    ...previous, thisTask
                ])
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err);
            })
      }

  return (
    <div>
        {thisTask ? 
        <>
        <h1>TaskUpdate</h1>
        
        <form onSubmit={handleSubmit}>
            <label>Task:</label>
            <input type="text" name="task" value={thisTask.task} onChange={handleChange}></input>
            <label>Reward:</label>
            <input type="number" name="reward" value={thisTask.reward} onChange={handleChange}></input>
            <button type="submit">Change</button>
        </form>
            
        </>

        
        : <h4>Loading...</h4>
        }
        
    </div>

  )
}

export default TaskUpdate
