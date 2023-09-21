import { post } from "../services/authService";
import Leisure from "../components/Leisure";
import React, { useState, useContext } from "react";
import { LoadingContext } from "../context/loading";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAdd(false);
    setShowNotEnough(false);
  };

  return (
    <div className="dash">
      <Snackbar open={showAdd} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Leisure Purchased, Check Dashboard!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showNotEnough}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Not Enough Points!
        </Alert>
      </Snackbar>
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
              Add Leisure
            </button>
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
