import React, { useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import BookCardSkeleton from "../components/BookCard/BookCardSkeleton";
import { useSearchBooks } from "../hooks/useSearchBooks";
import "./SearchPage.scss";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { books, isLoading, error } = useSearchBooks(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(input.trim());
  };

  return (
    <div className="search-page">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sök efter bok...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Sök</button>
      </form>

      {isLoading && (
        <div className="book-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      {!isLoading && books.length > 0 && (
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}

      {!isLoading && books.length === 0 && searchTerm && !error && (
        <p>Inga böcker hittades för "{searchTerm}".</p>
      )}
    </div>
  );
};

export default SearchPage;
