import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Book } from "../types/Book";
import { ReadBook } from "../types/ReadBook";

interface LibraryContextType {
  favorites: Book[];
  readBooks: ReadBook[];
  addFavorite: (book: Book) => void;
  removeFavorite: (key: string) => void;
  markAsRead: (book: Book, rating: number, review: string) => void;
  removeReadBook: (key: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

//sanera inkommande bokdata från localstorage
const sanitizeBook = (book: any): Book => ({
  ...book,
  author_name: Array.isArray(book.author_name) ? book.author_name : [],
});

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [favoritesRaw, setFavorites] = useLocalStorage<any[]>("favorites", []);
  const favorites: Book[] = favoritesRaw.map(sanitizeBook);

  const [readBooks, setReadBooks] = useLocalStorage<ReadBook[]>(
    "readBooks",
    []
  );

  const addFavorite = (book: Book) => {
    if (!favorites.some((b) => b.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFavorite = (key: string) => {
    setFavorites(favorites.filter((b) => b.key !== key));
  };

  const markAsRead = (book: Book, rating: number, review: string) => {
    const newEntry: ReadBook = {
      ...book,
      rating,
      review,
      page_count:
        "page_count" in book && typeof book.page_count === "number"
          ? book.page_count
          : 0,
    };

    setReadBooks((prev) => {
      const exists = prev.some((b) => b.key === book.key);
      return exists
        ? prev.map((b) => (b.key === book.key ? newEntry : b))
        : [...prev, newEntry];
    });
  };

  const removeReadBook = (key: string) => {
    setReadBooks(readBooks.filter((b) => b.key !== key));
  };

  return (
    <LibraryContext.Provider
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
    </LibraryContext.Provider>
  );
};

//custom hook för att använda contextet

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary måste användas inom en LibraryProvider");
  }

  return context;
};
