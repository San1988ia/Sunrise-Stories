import { Book } from "../types/Book";
import { useBookContext } from "../context/BookContext";
import { Link } from "react-router-dom";
import { useState } from "react";

interface BookCardProps {
  book: Book;
  showMarkAsReadForm?: boolean;
  onRemoveFavorite?: (key: string) => void;
}

const BookCard = ({
  book,
  showMarkAsReadForm = false,
  onRemoveFavorite,
}: BookCardProps) => {
  const { addFavorite, favorites, markAsRead, readBooks, removeReadBook } =
    useBookContext();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const isFavorite = favorites.some((fav) => fav.key === book.key);
  const isRead = readBooks.some((read) => read.key === book.key);

  const handleMarkAsRead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    markAsRead(book, rating, review);
    setRating(0);
    setReview("");
  };

  return (
    <div className="book-card">
      {book.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={`Omslag: ${book.title}`}
        />
      ) : (
        <div className="no-cover">Ingen omslagsbild</div>
      )}

      <div className="book-info">
        <Link to={`/book${book.key}`}>
          <h3>{book.title}</h3>
        </Link>
        {book.author_name && <p>{book.author_name.join(", ")}</p>}
        {book.rating !== undefined && (
          <p>
            <strong>Betyg:</strong> {book.rating} /5
          </p>
        )}
        {book.review && (
          <p>
            <strong>Recension:</strong> {book.review}
          </p>
        )}

        {book.page_count && (
          <p>
            <strong>Antal sidor:</strong> {book.page_count}
          </p>
        )}

        {book.first_sentence && (
          <p>
            <em>{book.first_sentence}</em>
          </p>
        )}
      </div>

      {onRemoveFavorite ? (
        <button onClick={() => onRemoveFavorite(book.key)}>
          ❌Ta bort favorit
        </button>
      ) : isFavorite ? (
        <button disabled>★ Redan favorit</button>
      ) : (
        <button onClick={() => addFavorite(book)}>☆ Lägg till favorit</button>
      )}

      {showMarkAsReadForm && !isRead && (
        <form onSubmit={handleMarkAsRead}>
          <h4>Ge betyg och recension</h4>
          <label>
            Betyg:
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= rating ? "filled" : ""}
                  onClick={() => setRating(star)}
                  role="button"
                  aria-label={`Sätt betyg ${star}`}
                >
                  ★
                </span>
              ))}
            </div>
          </label>

          <label>
            Recension:
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>

          <button type="submit">Spara</button>
        </form>
      )}

      {isRead && (
        <>
          <p className="already-read">📖 Redan markerad som läst</p>
          <button onClick={() => removeReadBook(book.key)}>
            ❌ Ta bort från lästa
          </button>
        </>
      )}
    </div>
  );
};

export default BookCard;
