import { useEffect, useState } from "react";
import { getBookDetails } from "../api/openLibrary";
import { Book } from "../types/Book";

export const useBookDetails = (bookKey: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookKey) return;

    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getBookDetails(bookKey);
        setBook(data);
      } catch (error) {
        console.error("Fel vid hämtning:", error);
        setError("Något gick fel vid hämtning av bok.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookKey]);

  return { book, isLoading, error };
};
