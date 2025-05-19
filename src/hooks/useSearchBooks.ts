import { useEffect, useState } from "react";
import { searchBooks } from "../api/openLibrary";
import { Book } from "../types/Book";

interface RawSearchResult {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_sentence?: string[];
  subject?: string[];
  number_of_pages_median?: number;
}

interface UseSearchBooksResult {
  books: Book[];
  isLoading: boolean;
  error: string | null;
}

export const useSearchBooks = (query: string): UseSearchBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await searchBooks(query);

        const mappedBooks: Book[] = data.docs.map((item: RawSearchResult) => ({
          key: item.key,
          title: item.title,
          author_name: item.author_name || [],
          cover_i: item.cover_i,
          first_sentence: item.first_sentence?.[0] || "",
          subject: item.subject?.slice(0, 5) || [],
          page_count: item.number_of_pages_median || 0,
          description: "",
          table_of_contents: [],
        }));

        setBooks(mappedBooks);
      } catch (err) {
        console.error("Fel vid bokhämtning:", err);
        setError("Något gick fel vid hämtning av böcker.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return { books, isLoading, error };
};
