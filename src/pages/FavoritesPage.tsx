import BookCard from "../components/BookCard/BookCard";
import { useLibrary } from "../context/LibraryContext";
import "./FavoritesPage.scss";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useLibrary();

  return (
    <div className="favorites-page">
      <h1>Mina Favoriter</h1>
      {favorites.length === 0 ? (
        <p>Du har inga favoritmarkerade böcker ännu.</p>
      ) : (
        <div className="book-list">
          {favorites.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              onRemove={() => removeFavorite(book.key)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
