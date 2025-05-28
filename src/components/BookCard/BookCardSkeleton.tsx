import "./BookCardSkeleton.scss";

const BookCardSkeleton = () => {
  return (
    <div className="book-card skeleton fade_in">
      <div className="skeleton-cover" />
      <div className="skeleton-title" />
      <div className="skeleton-author" />
      <div className="skeleton-block" />
      <div className="skeleton-block short" />
      <div className="skeleton-block" />
      <div className="skeleton-button" />
      <div className="skeleton-button" />
    </div>
  );
};

export default BookCardSkeleton;
