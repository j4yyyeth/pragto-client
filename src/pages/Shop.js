import { useContext, useState } from "react"
import { LoadingContext } from "../context/loading"
import { post, get } from "../services/authService"

const Shop = () => {

    const { user, leisures, setLeisures, points, setPoints } = useContext(LoadingContext)


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
        post(`/leisure/create/${user._id}`, newLeisure)
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

    const handleDelete = (e) => {
        e.preventDefault()
        get(`/leisure/delete/${user._id}`)
        console.log(user._id)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        // setPoints(points + )          // handling the add of a leisure into task array
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
            { user &&
                user.leisures.map((leisure, i) => {
                    return (
                        <div className="list-item" key={i}>
                            <button className="check-btn">➕</button>
                            {/* later replace with plus image */}
                            <h4>{leisure.leisure}</h4>
                            <p>Cost: {leisure.cost}</p>
                            <button className="delete-btn" onClick={handleDelete}>𝙓</button>
                            {/* later replace with delete image */}
                        </div>
                    ) 
                })
                
            }
        </div>
    </div>
  )
}

export default Shop;
