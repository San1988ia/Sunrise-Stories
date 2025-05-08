import { useState } from "react";
import { Book } from "../types/Book";
import BookCard from "../components/BookCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );

      if (!response.ok) {
        throw new Error("Något gick fel vid hämtning av böcker");
      }

      const data = await response.json();
      const books: Book[] = data.docs.map((doc: any) => ({
        key: doc.key,
        title: doc.title,
        author_name: doc.author_name || ["okänd författare"],
        first_sentence: doc.first_sentence?.[0],
        cover_i: doc.cover_i,
        page_count: doc.number_of_pages_median || 0,
      }));

      setResults(books);
    } catch (err) {
      setError("Kunde inte hämta data, försök senare");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooks();
  };

  return (
    <div className="search-page">
      <h2>Sök efter en bok</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          id="search-input"
          type="text"
          placeholder="Ex Sania Dehghani"
          aria-label="Sök efter boktitel"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          required
        />
        <button type="submit">Sök</button>
      </form>

      {loading && (
        <p className="loading" aria-live="polite">
          Söker böcker...
        </p>
      )}
      {error && (
        <p className="error" aria-live="assertive">
          {error}
        </p>
      )}

      {results.length === 0 && query && !loading && !error && (
        <p className="no-results">
          Inga böcker funna för '{query}'. Prova med ett annat sökord.
        </p>
      )}

      <div className="results">
        {results.map((book) => (
          <div className="fade-in" key={book.key}>
            <BookCard book={book} showMarkAsReadForm={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
