import { useContext, useState } from "react"
import { LoadingContext } from "../context/loading"
import { post, get } from "../services/authService"
import { Link } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"

const Shop = () => {

    const { user, setUser, leisures, setLeisures, points, setPoints, add, setAdd, render, setRender } = useContext(LoadingContext)


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

    const handleDelete = (id) => {
        get(`/leisure/delete/${id}`)
            .then((results) => {
                setUser(results.data)
            })
        console.log(id)
    }

    const handlePoints = (cost, taskId) => {
        // 
    }

    const handleAdd = () => {
        //
    }

  return (
    <div className="shop">
        <div className="shop-text">
            <h3>Welcome to the Shop!</h3>
            <p>Here you can spend your hard earned coin on leisures ...</p>
            <p>And the best part is that <b>you</b> create them!</p>
        </div>
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
                <>

                { user.leisures?.length ?
                
                user.leisures.map((leisure, i) => {
                    return (
                            <div className="list-item" key={i}>
                                {/* <input type="checkbox"></input> */}
                                <button className="check-btn">➕</button>  {/* onClick={()=>handleAdd(leisure.cost, leisure._id)} */}
                                <h4>{leisure.leisure}</h4>
                                <p>COST: {leisure.cost}</p>
                                <button className="delete-btn" onClick={()=>handleDelete(leisure._id)}>𝙓</button>
                                {/* later replace X with delete image */}
                                <Link to={`/leisure-update/${leisure._id}`} key={leisure._id}><button>✎</button></Link>
                            </div>
                    ) 
                })

                : <h4>No Leisures...</h4>
                
                }


                </>
                
            }
        </div>
    </div>
  )
}

export default Shop;
