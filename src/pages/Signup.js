import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

const Signup = () => {
  const { authenticateUser } = useContext(AuthContext);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((recent) => ({ ...recent, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", newUser)
      .then((results) => {
        navigate(`/dashboard`);
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
            value={newUser.email}
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
            value={newUser.password}
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
          Sign Up
        </button>
      </form>
      <h4 className="err-msg">{message}</h4>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
