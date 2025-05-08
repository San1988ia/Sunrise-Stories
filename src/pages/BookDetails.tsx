import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import "../styles/pages/bookDetails.scss";

interface BookDetail {
  key: string;
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
  first_sentence?: { value: string };
  author_name?: string[];
  page_count?: number;
}

const BookDetails = () => {
  const { key } = useParams() as { key: string };
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { favorites, addFavorite, removeFavorite, markAsRead, readBooks } =
    useBookContext();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://openlibrary.org${key}.json`);
        const data = await response.json();
        setBook({ ...data, key });
      } catch (error) {
        console.error("kunde inte hämta bok:", error);
      } finally {
        setLoading(false);
      }
    };

    if (key) {
      fetchBook();
    }
  }, [key]);

  const description =
    typeof book?.description === "string"
      ? book.description
      : book?.description?.value;

  const isFavorite = favorites.some((fav) => fav.key === book?.key);
  const isRead = readBooks.some((read) => read.key === book?.key);

  const handleFavoriteToggle = () => {
    if (!book) return;
    isFavorite ? removeFavorite(book.key) : addFavorite(book);
  };

  const handleMarkAsRead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (book) {
      markAsRead(book, rating, review);
      setRating(0);
      setReview("");
    }
  };

  if (loading) return <p className="loading">Laddar bokinfo...</p>;
  if (!book) return <p className="error">Ingen bok hittad.</p>;

  return (
    <div className="book-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Tillbaka
      </button>

      <h2>{book.title}</h2>
      {book.author_name && (
        <p>
          <strong>Författare:</strong> {book.author_name.join(", ")}
        </p>
      )}

      {book.covers?.[0] ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={`Omslag för ${book.title}`}
        />
      ) : (
        <div className="no-cover">Ingen omslagsbild</div>
      )}

      {book.page_count && (
        <p>
          <strong>Antal sidor:</strong> {book.page_count}
        </p>
      )}

      {description && (
        <p className="description">
          <strong>Beskrivning:</strong> {description}
        </p>
      )}

      {book.first_sentence?.value && (
        <p className="first-sentence">
          <em>{book.first_sentence.value}</em>
        </p>
      )}

      {book.subjects && (
        <div className="subjects">
          <h4>Ämnen / Genre:</h4>
          <ul>
            {book?.subjects?.slice(0, 10).map((subject, idx) => (
              <li key={idx}>{subject}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="favorite-button" onClick={handleFavoriteToggle}>
        {isFavorite ? "★ Ta bort som favorit" : "☆ Lägg till som favorit"}
      </button>

      {!isRead && (
        <form className="read-form" onSubmit={handleMarkAsRead}>
          <h4>Markera som läst</h4>
          <label>
            Betyg (1-5):
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            />
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
        <p className="already-read">📖 Den här boken är markerad som läst.</p>
      )}
    </div>
  );
};

export default BookDetails;
