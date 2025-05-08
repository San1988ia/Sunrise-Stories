import { useNavigate } from "react-router-dom";
import Stats from "../components/Stats";
import "../styles/pages/home.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/search");
  };

  return (
    <div className="home-background">
      <div className="home-content">
        <div className="home-left">
          <h1>
            Välkommen till <span className="highlight">Sunrise Stories</span>
          </h1>
          <p>Discover calm through every chapter</p>

          <button className="start-button" onClick={handleExploreClick}>
            Utforska böcker
          </button>
        </div>
        <Stats />
      </div>
    </div>
  );
};

export default Home;
