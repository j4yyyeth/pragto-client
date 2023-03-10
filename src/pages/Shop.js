import { useContext, useState } from "react"
import { LoadingContext } from "../context/loading"
import { post, get } from "../services/authService"
import { Link } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../services/baseUrl"

const Shop = () => {

    const { user, setUser, leisures, setLeisures, setPoints, add, setAdd, render, setRender } = useContext(LoadingContext)


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
                setNewLeisure({leisure: "", cost: ""})
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

    const handlePoints = (cost, leisureId) => {
        axios.put(`${baseUrl}/users/subtract/points/${user._id}`, {points: cost, leisureId: leisureId})
            .then((results) => {
                setRender(!render)
                console.log(render)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleAdd = (leisureCost, leisureId) => {
        if (add === false) {
            setAdd(true);                 
             setPoints(leisureCost);
             
            handlePoints(leisureCost, leisureId)
        }
    }

  return ( 
    <div className="dash">
        <div className="shop-text">
            <h3>Welcome to the Shop!</h3>
            <p>Here you can spend your hard earned coin on leisures ...</p>
            <p>And the best part is that <b>you</b> create them!</p>
        </div>
        <div className="dashboard-block">
            <form onSubmit={handleSubmit}>
                <div className="input-button">
                    <label>Leisure</label>
                    <input type="text" name="leisure" required={true} onChange={handleChange}></input>
                    <label>Cost</label>
                    <input type="number" min="1" name="cost" required={true} onChange={handleChange}></input>
                    <button type="submit">Add</button>
                </div>
            </form>
            { user &&
                <>

                { user.leisures?.length ?
                
                user.leisures.map((leisure, i) => {
                    return (
                        leisure.added === true?
                                    <></>

                                    :
                            <div className="list-item" key={i}>
                                <div className="list-btns">
                                    <button className="check-btn" onClick={()=>handleAdd(leisure.cost, leisure._id)}>➕</button>
                                    <button className="delete-btn" onClick={()=>handleDelete(leisure._id)}>𝙓</button>
                                    <Link to={`/leisure-update/${leisure._id}`} key={leisure._id}><button className="edit-btn">✎</button></Link>
                                </div>
                                    <div className="list-txt">
                                        <h4>{leisure.leisure}</h4>
                                        <p>COST: <b>{leisure.cost}</b></p>
                                    </div>
                            </div>
                    ) 
                })

                : <h4>Give yourself a break!</h4>
                
                }


                </>
                
            }
        </div>
    </div>
  )
}

export default Shop;
