import { useBookContext } from "../context/BookContext";
import BookCard from "../components/BookCard";

const ReadBooks = () => {
  const { readBooks } = useBookContext();

  if (readBooks.length === 0) {
    return (
      <p className="empty-message">
        Du har inte markerat några lästa böcker än.
      </p>
    );
  }

  const totalPages = readBooks.reduce(
    (sum, book) => sum + (book.page_count || 0),
    0
  );

  return (
    <div className="read-books fade-in">
      <div className="read-books-header">
        <h2>Mina lästa böcker</h2>
        <div className="read-books-stats">
          <p>
            <strong>Antal böcker:</strong> {readBooks.length}
          </p>
          <p>
            <strong>Antal sidor:</strong> {totalPages}
          </p>
        </div>
      </div>

      <div className="results">
        {readBooks.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
};

export default ReadBooks;
