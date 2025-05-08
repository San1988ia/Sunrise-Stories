import { useBookContext } from "../context/BookContext";
import "../styles/components/_stats.scss";

const Stats = () => {
  const { readBooks, favorites } = useBookContext();

  const totalBooks = readBooks.length;
  const totalFavorites = favorites.length;
  const totalPages = readBooks.reduce(
    (sum, book) => sum + (book.page_count || 0),
    0
  );

  return (
    <div className="stats-box">
      <h2 className="stats-title">Statistik</h2>
      <ul className="stats-list">
        <li>
          <span>📚 Favoritböcker:</span> {totalFavorites}
        </li>
        <li>
          <span>✅ Lästa böcker:</span> {totalBooks}
        </li>
        <li>
          <span>📖 Lästa sidor:</span> {totalPages}
        </li>
      </ul>
    </div>
  );
};

export default Stats;
