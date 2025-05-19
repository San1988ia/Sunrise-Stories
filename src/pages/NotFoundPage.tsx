import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Sidan kunde inte hittas😕</h1>
      <p>Oj! Sidan du försöker nå finns inte.</p>
      <Link to="/" className="back-home">
        ⬅ Gå till startsidan
      </Link>
    </div>
  );
};

export default NotFoundPage;
