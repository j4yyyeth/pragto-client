import { post } from "../services/authService";
import Leisure from "../components/Leisure";
import { useState, useContext } from "react";
import { LoadingContext } from "../context/loading";

const Shop = () => {
  const { user, leisures, setLeisures } = useContext(LoadingContext);
  const [newLeisure, setNewLeisure] = useState({
    leisure: "",
    cost: "",
  });
  const [showNotEnough, setShowNotEnough] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const handleChange = (e) => {
    setNewLeisure((recent) => ({ ...recent, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/leisure/create/${user._id}`, newLeisure)
      .then((results) => {
        let newLeisures = [...leisures];
        newLeisures.unshift(results.data);
        setLeisures(newLeisures);
        setNewLeisure({ leisure: "", cost: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <input
              type="text"
              name="leisure"
              value={newLeisure.leisure}
              required={true}
              onChange={handleChange}
            ></input>
            <label>Cost</label>
            <input
              type="number"
              min="1"
              name="cost"
              value={newLeisure.cost}
              required={true}
              onChange={handleChange}
            ></input>
            <button type="submit" className="add-task-btn">
              Add
            </button>
            {showAdd && <h3 id="green-msg">Leisure added to dashboard!</h3>}
            {showNotEnough && <h3 id="red-msg">Not enough points</h3>}
          </div>
        </form>
        {user && (
          <>
            {user.leisures?.length ? (
              user.leisures.map((leisure, i) => {
                return (
                  <div key={i}>
                    {leisure.added === true ? (
                      <></>
                    ) : (
                      <Leisure
                        leisure={leisure}
                        i={i}
                        setShowNotEnough={setShowNotEnough}
                        setShowAdd={setShowAdd}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <h4>Give yourself a break!</h4>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
