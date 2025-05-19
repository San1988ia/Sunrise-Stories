const getCoverUrl = (
  coverId: number | undefined,
  size: "S" | "M" | "L" = "M"
): string => {
  if (!coverId) {
    return "https://via.placeholder.com/150x200?text=Ingen+bild";
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export default getCoverUrl;
