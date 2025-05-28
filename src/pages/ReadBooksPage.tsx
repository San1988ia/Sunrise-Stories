import BookCardSkeleton from "../components/BookCard/BookCardSkeleton";
import { useLibrary } from "../context/LibraryContext";
import { ReadBook } from "../types/ReadBook";
import "./ReadBooksPage.scss";

const ReadBooksPage = () => {
  const { readBooks, removeReadBook } = useLibrary();
  const isLoading = false;

  const totalPages = readBooks.reduce(
    (sum, book) => sum + (book.page_count || 0),
    0
  );
  const totalBooks = readBooks.length;

  return (
    <div className="read-books-page">
      <h1>Mina lästa böcker</h1>

      {isLoading ? (
        <div className="book-list fade_in">
          {Array.from({ length: 3 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      ) : totalBooks === 0 ? (
        <p>Du har inte markerat några lästa böcker ännu.</p>
      ) : (
        <>
          <div className="read-books-summary fade_in">
            <p>
              📘 Totalt lästa böcker: <strong>{totalBooks}</strong>
            </p>
            <p>
              📖 Totalt antal sidor: <strong>{totalPages}</strong>
            </p>
          </div>

          <div
            className="book-list fade_in"
            aria-label="Lista med lästa böcker"
          >
            {readBooks.map((book: ReadBook) => (
              <div className="read-book-card" key={book.key}>
                <h2>{book.title}</h2>
                <p>
                  <strong>Författare:</strong>{" "}
                  {book.author_name?.join(", ") || "Okänd författare"}
                </p>
                <p>
                  <strong>Sidor:</strong> {book.page_count ?? "Okänt"}
                </p>
                <p>
                  <strong>Betyg:</strong> {book.rating} / 5
                </p>
                <p>
                  <strong>Recension:</strong> {book.review}
                </p>
                <button onClick={() => removeReadBook(book.key)}>
                  Ta bort
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReadBooksPage;
