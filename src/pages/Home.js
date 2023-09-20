import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading";

const Home = () => {
  const { user } = useContext(LoadingContext);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="top">
        <section className="hero-section">
          <div className="hero-text">
            <h1>Pragto</h1>
            <p>
              Get things done and get <span>rewarded</span>
            </p>
            {user ? (
              <Link to={"/dashboard"}>Go to My Dashboard</Link>
            ) : (
              <Link to={"/signup"}>Get Started</Link>
            )}
          </div>
          <div className="hero-image">
            <img
              className="person-img"
              src={require("../person.jpg")}
              alt="logo"
            />
          </div>
        </section>
      </div>
      <div className="middle">
        <h1>How to use</h1>
        <div className="how-to">
          <div className="how-to-txt">
            <h2>Dashboard</h2>
            <p>Create task</p>
            <p>Earn on completion</p>
            <p>Save or spend points on a leisure</p>
          </div>
          <div className="how-to-txt">
            <h2>Shop</h2>
            <p>Create leisure</p>
            <p>Add to your dashboard with points</p>
            <p>Take a break</p>
          </div>
        </div>
        <div className="reminder">
          <h2>
            Remember: You set the reward/cost for tasks and leisures, so don't
            cheat yourself
          </h2>
          <span className="material-symbols-outlined">check_circle</span>
        </div>
      </div>
      <footer>
        <h3>© 2023 Pragto</h3>
      </footer>
    </>
  );
};

export default Home;
