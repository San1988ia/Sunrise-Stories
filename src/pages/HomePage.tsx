import { Link } from "react-router-dom";
import Stats from "../components/Stats/Stats";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="home-welcome">
        <h1>
          <span className="highlight">Välkommen till</span>{" "}
          <span className="app-name">Sunrise Stories</span>
        </h1>
        <p>📖 Discover calm through every chapter</p>
        <Link to="/search">
          <button>Utforska böcker</button>
        </Link>
      </section>

      <Stats />
    </div>
  );
};

export default HomePage;
