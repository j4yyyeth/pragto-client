import { useContext, useState } from "react"
import { LoadingContext } from "../context/loading"
import { post } from "../services/authService"

const Shop = () => {

    const { user, leisures, setLeisures } = useContext(LoadingContext)


    const [ newLeisure, setNewLeisure ] = useState(
        {
            leisure: '',
            cost: ''
        }
    )

    const handleChange = (e) => {
        setNewLeisure((recent) => ({...recent, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/todo/create/${user._id}`, newLeisure)
            .then((results) => {

                let newLeisures = [...leisures]
                newLeisures.unshift(results.data)
                setLeisures(newLeisures)

                console.log(user)

            })
            .catch((err) => {
                console.log(err)
            })
    }

  return (
    <div>
        <h3>Welcome to the Shop!</h3>
        <p>Here you can spend your hard earned coin on leisures ...</p>
        <p>And the best part is that <b>you</b> create them!</p>
        <div className="Shop-block">
            <form onSubmit={handleSubmit}>
                <div className="input-button">
                    <label>Leisure</label>
                    <input type="text" name="leisure" required={true} onChange={handleChange}></input>
                    <label>Cost</label>
                    <input type="number" min="0" name="cost" required={true} onChange={handleChange}></input>
                    <button type="submit">Add</button>
                </div>
            </form>
            {/* {
                user.tasks.map((task, i) => {
                    return (
                        <div className="list-item" key={i}>
                            <h2>{task.task}</h2>
                            <h4>{task.reward}</h4>
                        </div>
                    ) 
                })
                
            } */}
        </div>
    </div>
  )
}

export default Shop;