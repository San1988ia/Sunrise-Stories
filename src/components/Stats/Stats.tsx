import { useLibrary } from "../../context/LibraryContext";
import "./Stats.scss";

const Stats = () => {
  const { readBooks } = useLibrary();

  const totalBooks = readBooks.length;
  const totalPages = readBooks.reduce(
    (sum, book) => sum + (book.page_count || 0),
    0
  );

  return (
    <section className="stats-container" aria-label="Lässtatistik">
      <h1>📊 Din Lässtatistik</h1>
      <p>
        📘 Antal lästa böcker: <strong>{totalBooks}</strong>
      </p>
      <p>
        📖 Totalt antal sidor: <strong>{totalPages}</strong>
      </p>
    </section>
  );
};

export default Stats;
