import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../context/loading";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {


    const getToken = () => {
        return localStorage.getItem('authToken');
    }

    const { logout } = useContext(AuthContext);

    const { points } = useContext(LoadingContext);

    return (
        <nav>
        <Link to={'/'}>PRAGTO</Link>
            {
                getToken() ? 
                <>
                    <Link to={'/dashboard'}>Dashboard</Link>
                    <Link to={'/shop'}>Shop</Link>
                    <h3>PTS: {points}</h3> <img src='../coins.png' alt="coins" />
                    <Link onClick={logout}>Logout</Link>
                </>

                : 

                <>
                <Link to={'/signup'}>Sign Up</Link>
                <Link to={'/login'}>Login</Link>
                </>
            }
        </nav> 
    )
}

export default Navbar;