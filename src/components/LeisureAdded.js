import { useContext } from "react";
import { LoadingContext } from "../context/loading";
import { get } from "../services/authService";
import { AiOutlineCheckCircle } from "react-icons/ai";

const LeisureAdded = ({ leisure, i }) => {
  const { setUser } = useContext(LoadingContext);
  const handleLeisureDelete = (id) => {
    get(`/leisure/delete/${id}`)
      .then((results) => {
        setUser(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div key={i}>
      {leisure.added === true ? (
        <div className="list-item-leisure" key={leisure._id}>
          <h4>{leisure.leisure}</h4>
          <button
            className="check-btn-leisure"
            onClick={() => handleLeisureDelete(leisure._id)}
          >
            <AiOutlineCheckCircle className="three-icon" />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LeisureAdded;
