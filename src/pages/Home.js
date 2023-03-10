import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading";

const Home = () => {

  const { user } = useContext(LoadingContext);
  return (
    <>
      <main>
        <section className="hero-section">
          <div className="hero-text">
            <h1>Welcome to Pragto</h1>
            <p>Your very own simplified to-do app, but <span className="fun">fun</span></p>
            {
              user ? 

              <Link to={'/dashboard'}>Go to My Dashboard</Link>

              :

              <Link to={'/signup'}>Get Started</Link>
            }
          </div>
            <div className="hero-image">
            <img className="person-img" src={require('../person.jpg')} alt="logo" />
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;
