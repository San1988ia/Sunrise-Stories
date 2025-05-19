import "./BookCardSkeleton.scss";

const BookDetailsSkeleton = () => {
  return (
    <div className="book-details-skeleton fade_in">
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

export default BookDetailsSkeleton;
