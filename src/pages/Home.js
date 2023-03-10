import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main>
        <section className="hero-section">
          <div class="hero-text">
            <h1>Welcome to Pragto</h1>
            <p>Your very own simplified to-do app, but <span className="fun">fun</span></p>
            <Link to={'/signup'}>Get Started</Link>
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
