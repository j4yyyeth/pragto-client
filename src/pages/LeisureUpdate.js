import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { LoadingContext } from "../context/loading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"

const LeisureUpdate = () => {
    const navigate = useNavigate();
    const { user, setLeisures } = useContext(LoadingContext)
    const { leisureId } = useParams()

    const [ thisLeisure, setThisLeisure ] = useState(null)

    useEffect(() => {
        if (user && user.leisures) {
            let leisure = user.leisures.find((leisure) => leisure._id === leisureId)
            setThisLeisure(leisure)
        }
    }, [user, leisureId]) 

    const handleChange = (e) => {
        setThisLeisure((recent) => ({...recent, [e.target.name]:e.target.value}));
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${baseUrl}/leisure/update/${thisLeisure._id}`, thisLeisure)
            .then((updated) => {
                setThisLeisure(updated);
                console.log(updated);
                setLeisures(previous => [
                    ...previous, thisLeisure
                ])
                navigate('/shop');
            })
            .catch((err) => {
                console.log(err);
            })
      }

  return (
    <div>
    {thisLeisure ? 
    <>
    <h1>LeisureUpdate</h1>
    
    <form onSubmit={handleSubmit}>
        <label>Leisure:</label>
        <input type="text" name="leisure" value={thisLeisure.leisure} onChange={handleChange}></input>
        <label>Cost:</label>
        <input type="number" name="cost" value={thisLeisure.cost} onChange={handleChange}></input>
        <button type="submit">Change</button>
    </form>
        
    </>

    
    : <h4>Loading...</h4>
    }
    
    </div>

  )
}

export default LeisureUpdate;