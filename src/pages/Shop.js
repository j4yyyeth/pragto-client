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

    const [showNotEnough, setShowNotEnough] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const [leisureDropdownStates, setLeisureDropdownStates] = useState([]);

    const [activeDropdown, setActiveDropdown] = useState(null);

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

    const handleDelete = (id, index) => {
        get(`/leisure/delete/${id}`)
            .then((results) => {
                setUser(results.data)
                toggleDropdown(index)
            })
        console.log(id)
    }

    const handlePoints = (cost, leisureId) => {
        axios.put(`${baseUrl}/users/subtract/points/${user._id}`, {points: cost, leisureId: leisureId})
            .then(() => {
                setRender(!render)
                setAdd(false);
                console.log(render)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleAdd = (leisureCost, leisureId) => {
        if (!add) {
            if (user.points >= leisureCost) {
                setPoints(leisureCost);
                handlePoints(leisureCost, leisureId);
                setAdd(true);
                setShowAdd(true);
                setTimeout(() => {
                  setShowAdd(false);
                }, 1000);
            } else {
                setShowNotEnough(true);
                setTimeout(() => {
                  setShowNotEnough(false);
                }, 1000);
            }
        }
    }

    function toggleDropdown(i) {
        const newLeisureDropdownStates = [...leisureDropdownStates];
        newLeisureDropdownStates[i] = !newLeisureDropdownStates[i];
        setLeisureDropdownStates(newLeisureDropdownStates);

        // update the active dropdown
        if (activeDropdown !== null && activeDropdown !== i) {
            newLeisureDropdownStates[activeDropdown] = false;
            setLeisureDropdownStates(newLeisureDropdownStates);
        }
        setActiveDropdown(newLeisureDropdownStates[i] ? i : null);
    }

  return ( 
    <div className="dash">
        <div className="shop-text">
            <h3>Welcome to the Shop</h3>
            <p>Create a leisure and take a break!</p>
        </div>
        <div className="dashboard-block">
            <form onSubmit={handleSubmit}>
                <div className="input-button">
                    <label>Leisure</label>
                    <input type="text" name="leisure" value={newLeisure.leisure} required={true} onChange={handleChange}></input>
                    <label>Cost</label>
                    <input type="number" min="1" name="cost" value={newLeisure.cost} required={true} onChange={handleChange}></input>
                    <button type="submit" className="add-task-btn">Add</button>
                    {showAdd && <h3 id="green-msg">Leisure added to dashboard!</h3>}
                    {showNotEnough && <h3 id="red-msg">Not enough points</h3>}
                </div>
            </form>
            { user &&
                <>

                { user.leisures?.length ?
                
                user.leisures.map((leisure, i) => {
                    return (
                        <div key={i}>
                        {leisure.added === true?
                            <></>

                                    :
                            <div className='list-item' key={leisure._id}>
                                <div className="drop-wrap">
                                    <p>COST: <b>{leisure.cost}</b></p>
                                    <div className="dropdown">
                                        <button className="btn" onClick={() => toggleDropdown(i)} aria-haspopup="true" aria-expanded={leisureDropdownStates[i]}>⋯</button>
                                        <div className={`dropdown-menu${leisureDropdownStates[i] ? " show" : ""}`}>
                                            <button className="dropdown-item plus-btn" onClick={()=>handleAdd(leisure.cost, leisure._id)}>+</button>
                                            <button className="dropdown-item delete-btn" onClick={()=>handleDelete(leisure._id, i)}>𝙓</button>
                                            <Link className="dropdown-item edit-btn" to={`/leisure-update/${leisure._id}`} key={leisure._id}>✎</Link>
                                        </div>
                                    </div>
                                </div>
                                    <div className="list-txt">
                                        <h4>{leisure.leisure}</h4>
                                    </div>
                            </div>
                        }
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
