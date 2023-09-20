import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";
import { Link } from "react-router-dom";

const Login = () => {
  const { authenticateUser } = useContext(AuthContext);

  const [thisUser, setthisUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setthisUser((recent) => ({ ...recent, [e.target.name]: e.target.value }));
    console.log("Changing user", thisUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", thisUser)
      .then((results) => {
        console.log("Created User", results.data);
        navigate("/");
        localStorage.setItem("authToken", results.data.token);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setMessage(err.response.data.message);
        }, 1000);
      })
      .finally(() => {
        authenticateUser();
      });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={thisUser.email}
          onChange={handleChange}
        ></input>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={thisUser.password}
          onChange={handleChange}
        ></input>
        <button type="submit">Login</button>
        <h4 className="err-msg">{message}</h4>
      </form>
      <p>
        Not a user? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
