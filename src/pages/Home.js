import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading";
import { BsShopWindow, BsCardChecklist } from "react-icons/bs";
import { GiCoins } from "react-icons/gi";
import { BiWinkSmile } from "react-icons/bi";

const Home = () => {
  const { user } = useContext(LoadingContext);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Pragto</h1>
          <p>
            Get things done and get <span>rewarded</span>
          </p>
          {user ? (
            <>
              <Link className="home-a" to={"/dashboard"}>
                <button className="arrow-btn">
                  My Dashboard
                  <div className="arrow-wrapper">
                    <div className="arrow"></div>
                  </div>
                </button>
              </Link>
            </>
          ) : (
            <Link className="home-a" to={"/signup"}>
              <button className="arrow-btn">
                Get Started
                <div className="arrow-wrapper">
                  <div className="arrow"></div>
                </div>
              </button>
            </Link>
          )}
        </div>
        <div className="cards">
          <div className="card-description">
            <h3>Complete</h3>
            <BsCardChecklist className="card-icon" />
          </div>
          <div className="card-description">
            <h3>Earn</h3>
            <GiCoins className="card-icon" />
          </div>
          <div className="card-description">
            <h3>Shop</h3>
            <BsShopWindow className="card-icon" />
          </div>
        </div>
      </section>
      <section className="middle">
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
            <span>Remember:</span> You set the reward/cost for tasks and leisures, so don't
            cheat yourself
          </h2>
          <BiWinkSmile className="smile" />
        </div>
      </section>
      <footer>
        <h3>© {new Date().getFullYear()} Pragto</h3> 
      </footer>
    </main>
  );
};

export default Home;
