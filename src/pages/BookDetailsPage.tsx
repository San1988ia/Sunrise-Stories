import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookDetailsSkeleton from "../components/BookCard/BookCardSkeleton";
import { useLibrary } from "../context/LibraryContext";
import { useBookDetails } from "../hooks/useBookDetails";
import "../pages/BookDetailPage.scss";
import getCoverUrl from "../utils/getCoverUrl";

const BookDetailsPage = () => {
  const { "*": id } = useParams();
  const { book, isLoading, error } = useBookDetails(id || "");
  useEffect(() => {
    console.log("🔍 Bokdata:", book);
  }, [book]);
  const { addFavorite, markAsRead } = useLibrary();

  const handleAddFavorite = () => {
    if (book) addFavorite(book);
  };

  const handleMarkAsRead = () => {
    if (book) markAsRead(book, 4, "Bra bok!");
  };

  if (isLoading) return <BookDetailsSkeleton />;
  if (error || !book) return <p>{error ?? "Kunde inte visa bok."}</p>;

  return (
    <div className="book-details-page fade_in">
      <h1>{book.title}</h1>
      <img
        src={getCoverUrl(book.cover_i, "L")}
        alt={book.title}
        className="book-detail-cover"
      />

      <p>
        <strong>Författare:</strong>{" "}
        {Array.isArray(book.author_name)
          ? book.author_name.join(", ")
          : book.author_name || "Okänd författare"}
      </p>

      {book.first_sentence && (
        <p>
          <em>{book.first_sentence}</em>
        </p>
      )}

      {book.description && (
        <p>
          <strong>Om boken:</strong>{" "}
          {typeof book.description === "string"
            ? book.description
            : book.description?.value}
        </p>
      )}

      {book.subject && (
        <p>
          <strong>Ämnen:</strong> {book.subject.join(", ")}
        </p>
      )}

      {book.table_of_contents && book.table_of_contents.length > 0 && (
        <div className="toc-section">
          <strong>Innehållsförteckning:</strong>
          <ul>
            {book.table_of_contents.map((item, index) => (
              <li key={index}>
                {typeof item === "string"
                  ? item
                  : item.title ?? "Odefinierad titel"}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p>
        <strong>Antal sidor:</strong> {book.page_count || "Okänt"}
      </p>

      <button onClick={handleAddFavorite}>Lägg till favorit</button>
      <button onClick={handleMarkAsRead}>Markera som läst</button>
    </div>
  );
};

export default BookDetailsPage;
