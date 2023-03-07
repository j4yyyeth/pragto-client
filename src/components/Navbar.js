// import { useContext } from "react"
// import { LoadingContext } from "../context/loading.context"
// import { AuthContext } from "../context/auth.context"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../context/loading";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {

    const getToken = () => {
        return localStorage.getItem('authToken');
    }

    const { user } = useContext(LoadingContext);

    const { logout } = useContext(AuthContext);

    return (
        <nav>
        <Link to={'/'}>PRAGTO</Link>
            {
                getToken() ? 
                <>
                    {/* {user && <Link to={'/dashboard'}>Dashboard</Link>}  */}
                    <Link to={'/dashboard'}>Dashboard</Link>
                    <Link to={'/shop'}>Shop</Link>
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