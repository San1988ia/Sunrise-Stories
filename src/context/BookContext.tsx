import { useEffect, createContext, useContext, useState } from "react";
import { Book } from "../types/Book";

export interface ReadBook extends Book {
  rating: number;
  review: string;
  page_count?: number;
}

interface BookContextType {
  favorites: Book[];
  readBooks: ReadBook[];
  addFavorite: (book: Book) => void;
  removeFavorite: (key: string) => void;
  markAsRead: (book: Book, rating: number, review: string) => void;
  removeReadBook: (key: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Book[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? (JSON.parse(storedFavorites) as Book[]) : [];
  });

  const [readBooks, setReadBooks] = useState<ReadBook[]>(() => {
    const stored = localStorage.getItem("readBooks");
    return stored ? (JSON.parse(stored) as ReadBook[]) : [];
  });

  //Spara till localstorage vid ändring
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [readBooks]);

  //lägg till favorit bok

  const addFavorite = (book: Book) => {
    if (!favorites.find((b) => b.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  //ta bort som favorit

  const removeFavorite = (key: string) => {
    setFavorites(favorites.filter((b) => b.key !== key));
  };

  //ta bort läst bok
  const removeReadBook = (key: string) => {
    setReadBooks((prev) => prev.filter((b) => b.key !== key));
  };

  //markera som läst bok

  const markAsRead = (book: Book, rating: number, review: string) => {
    setReadBooks((prev) => {
      const exists = prev.find((b) => b.key === book.key);
      const pageCount = "page_count" in book ? book.page_count : 0;
      const newEntry: ReadBook = {
        ...book,
        rating,
        review,
        page_count: pageCount,
      };

      if (exists) {
        return prev.map((b) => (b.key === book.key ? newEntry : b));
      }
      return [...prev, newEntry];
    });
  };

  return (
    <BookContext.Provider
      value={{
        favorites,
        readBooks,
        addFavorite,
        removeFavorite,
        markAsRead,
        removeReadBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

//custom hook för att hämta contexten

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext måste användas inom en BookProvider");
  }

  return context;
};
