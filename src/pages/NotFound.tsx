import { Link } from "react-router-dom";
import "../styles/pages/notFound.scss";

const notFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Sidan kunde inte hittas</h1>
      <p>Oj! Sidan du försöker nå finns inte.</p>
      <Link to="/" className="back-home">
        Gå till startsidan
      </Link>
    </div>
  );
};

export default notFound;
