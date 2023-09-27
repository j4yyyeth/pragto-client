// import { Link } from "react-router-dom";
// import { useState, useContext } from "react";
// import { LoadingContext } from "../context/loading";
// import { AuthContext } from "../context/auth.context";
// import { BsCoin } from "react-icons/bs";

// const Navbar = () => {
//   const [color, setColor] = useState(false);

//   const changeColor = () => {
//     if (window.scrollY >= 40) {
//       setColor(true);
//     } else {
//       setColor(false);
//     }
//   };
//   window.addEventListener("scroll", changeColor);
//   const getToken = () => {
//     return localStorage.getItem("authToken");
//   };
//   const { logout } = useContext(AuthContext);
//   const { user } = useContext(LoadingContext);
//   return (
//     <>
//       <nav className={color ? "nav-color" : "no-color"}>
//         <span>
//           <Link to={"/"}>
//             <img className="logo" src={require("../logo.png")} alt="logo" />
//           </Link>
//         </span>
//         {getToken() ? (
//           <>
//             <Link to={"/dashboard"}>Dashboard</Link>
//             <Link to={"/shop"}>Shop</Link>
//             <Link onClick={logout}>Logout</Link>
// <div className="points-nav">
//   <BsCoin className="coin-icon" />
//   {user ? <h3>{user.points}</h3> : <p>0</p>}
// </div>
//           </>
//         ) : (
//           <>
//             <Link to={"/signup"}>Sign Up</Link>
//             <Link to={"/login"}>Login</Link>
//           </>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../context/loading";
import { AuthContext } from "../context/auth.context";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { BsCoin } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  const { logout } = useContext(AuthContext);
  const { user } = useContext(LoadingContext);

  return (
    <nav className={isScrolled ? "scrolled" : ""}>
      <div className="navbar-container">
        <div className="logo-container">
          <Link to={"/"}>
            <img className="logo" src={require("../logo.png")} alt="Logo" />
          </Link>
        </div>
        <div className="tokens-container">
          {getToken() ? (
            <div className="points-nav">
              <BsCoin className="coin-icon" />
              {user ? <h1>{user.points}</h1> : <p>0</p>}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={`nav-links ${showMenu ? "show" : ""}`}>
          {getToken() ? (
            <>
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
              <Link to={"/shop"} className="nav-link">
                Shop
              </Link>
              <Link onClick={logout} className="nav-link nav-link-logout">
                <FiLogOut className="logout-icon" />
              </Link>
            </>
          ) : (
            <>
              <Link to={"/signup"} className="nav-link">
                Sign Up
              </Link>
              <Link to={"/login"} className="nav-link">
                Log In
              </Link>
            </>
          )}
        </div>
        <div className={`hamburger ${showMenu ? "show" : ""}`}>
          <Hamburger toggled={showMenu} toggle={setShowMenu} />
        </div>
      </div>
    </nav>
  );
}
