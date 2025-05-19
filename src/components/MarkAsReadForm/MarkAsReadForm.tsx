import { useState } from "react";
import "./MarkAsReadForm.scss";

interface MarkAsReadFormProps {
  onSubmit: (rating: number, review: string, pageCount: number) => void;
  onCancel: () => void;
}

const MarkAsReadForm = ({ onSubmit, onCancel }: MarkAsReadFormProps) => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");
  const [pages, setPages] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, review, pages);
  };

  return (
    <form onSubmit={handleSubmit} className="mark-as-read-form">
      <label>
        Betyg: (1-5)
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </label>

      <label>
        Recension:
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </label>

      <label>
        Antal sidor:
        <input
          type="number"
          min="1"
          value={pages}
          onChange={(e) => setPages(Number(e.target.value))}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit">Spara</button>
        <button type="button" onClick={onCancel}>
          Avbryt
        </button>
      </div>
    </form>
  );
};

export default MarkAsReadForm;
