import { useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/authService";
import { LoadingContext } from "./loading";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { setIsLoading, setUser, setMessage, user, tasks, leisures, render } =
    useContext(LoadingContext);

  const navigate = useNavigate();

  const authenticateUser = () => {
    const token = localStorage.getItem("authToken");
    setIsLoading(true);
    if (token) {
      get("/auth/verify")
        .then((results) => {
          setUser(results.data);
        })
        .catch((err) => {
          localStorage.clear();
          setIsLoading(false);
          setMessage(err.message);
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      localStorage.clear();
      setIsLoading(false);
      setUser(null);
    }

    console.log("This is the user", user);
  };

  const logout = () => {
    localStorage.clear();
    setMessage("You are logged out.");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    authenticateUser();
  }, [tasks, leisures, render]);

  return (
    <AuthContext.Provider value={{ authenticateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
