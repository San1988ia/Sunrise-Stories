import { useState } from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "../../context/LibraryContext";
import { Book } from "../../types/Book";
import getCoverUrl from "../../utils/getCoverUrl";
import MarkAsReadForm from "../MarkAsReadForm/MarkAsReadForm";
import "./BookCard.scss";

interface BookCardProps {
  book: Book;
  isFavorite?: boolean;
  onRemove?: () => void;
}

const BookCard = ({ book, isFavorite = false, onRemove }: BookCardProps) => {
  const { addFavorite, markAsRead } = useLibrary();
  const [showForm, setShowForm] = useState(false);

  const handleAddFavorite = () => addFavorite(book);
  const handleShowForm = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);

  const handleSubmit = (rating: number, review: string, pageCount: number) => {
    markAsRead({ ...book, page_count: pageCount }, rating, review);
    setShowForm(false);
  };

  return (
    <div className="book-card">
      <Link to={`/book${book.key}`} className="book-card-content">
        <img
          src={getCoverUrl(book.cover_i)}
          alt={book.title}
          className="book-cover"
        />
        <h2>{book.title}</h2>
        <p>{book.author_name?.join(", ") || "Okänd författare"}</p>
        {book.first_sentence && (
          <p>
            <i>{book.first_sentence}</i>
          </p>
        )}
      </Link>

      <div className="button-group">
        {!isFavorite ? (
          <button onClick={handleAddFavorite}>Lägg till favorit</button>
        ) : (
          <button onClick={onRemove}>Ta bort favorit</button>
        )}

        {!showForm ? (
          <button onClick={handleShowForm}>Markera som läst</button>
        ) : (
          <div className="mark-as-read-form">
            <MarkAsReadForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
