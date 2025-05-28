import BookCard from "../components/BookCard/BookCard";
import BookCardSkeleton from "../components/BookCard/BookCardSkeleton";
import { useLibrary } from "../context/LibraryContext";
import "./FavoritesPage.scss";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useLibrary();
  const isLoading = false;

  return (
    <div className="favorites-page">
      <h1>Mina Favoriter</h1>

      {isLoading ? (
        <div className="book-list fade_in">
          {Array.from({ length: 4 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <p>Du har inga favoritmarkerade böcker ännu.</p>
      ) : (
        <div className="book-list fade_in">
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
