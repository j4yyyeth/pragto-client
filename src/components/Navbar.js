import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../context/loading";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {


    const getToken = () => {
        return localStorage.getItem('authToken');
    }

    const { logout } = useContext(AuthContext);

    const { user } = useContext(LoadingContext);

    return (
        <nav>
        <span><Link to={'/'}><img className="logo" src={require('../logo.png')} alt="logo" /></Link></span>
            {
                getToken() ? 
                <>
                    <Link to={'/dashboard'}>Dashboard</Link>
                    <Link to={'/shop'}>Shop</Link>
                    <Link onClick={logout}>Logout</Link>
                    <div className="points-nav">
                        <img className="coins-img" src={require('../coins.png')} alt="coins" />
                        {
                            user ? 
                            <h3>{user.points}</h3>

                            : <p>0</p>
                        }
                    </div>
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