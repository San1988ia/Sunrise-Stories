import { useBookContext } from "../context/BookContext";
import BookCard from "../components/BookCard";
import "../styles/pages/favorites.scss";

const Favorites = () => {
  const { favorites, removeFavorite } = useBookContext();

  if (favorites.length === 0) {
    return <p className="empty-message">Du har inga favoritböcker än</p>;
  }

  return (
    <div className="favorites">
      <h2>Mina favoriter</h2>
      <div className="favorites-list">
        {favorites.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onRemoveFavorite={removeFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
