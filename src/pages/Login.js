import React, { useContext, useState } from "react";
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
        navigate("/dashboard");
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
    <div className="signin-page">
      <form className="signin-form" onSubmit={handleSubmit}>
        <div class="form__group field">
          <input
            type="email"
            name="email"
            value={thisUser.email}
            onChange={handleChange}
            class="form__field"
            placeholder="Email"
            required
          ></input>
          <label for="email" class="form__label">
            Email
          </label>
        </div>
        <div class="form__group field">
          <input
            type="password"
            name="password"
            value={thisUser.password}
            onChange={handleChange}
            class="form__field"
            placeholder="Password"
            required
          ></input>
          <label for="password" class="form__label">
            Password
          </label>
        </div>
        <button className="signin-btn" type="submit">
          Log In
        </button>
      </form>
      <h4 className="err-msg">{message}</h4>
      <p>
        No account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
