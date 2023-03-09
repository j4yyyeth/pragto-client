import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { LoadingContext } from "../context/loading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"

const TaskUpdate = () => {
    const navigate = useNavigate();
    const { user } = useContext(LoadingContext)
    const { taskId } = useParams()

    const [ thisTask, setThisTask ] = useState(null)

    useEffect(() => {
        let task = user.tasks.find((task) => task._id === taskId)
        console.log(task);
        console.log("Task", task, taskId, user.tasks)
        setThisTask(task)
    }, [])

    const handleChange = (e) => {
        setThisTask((recent) => ({...recent, [e.target.name]:e.target.value}));
        console.log(thisTask)
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${baseUrl}/todo/update/taskId`)
            .then((updated) => {
                setThisTask(updated);
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
        <button type="submit">Change</button>
    </form>
        
    </>

    
    : <h4>Loading...</h4>
    }
    
    </div>

  )
}

export default TaskUpdate