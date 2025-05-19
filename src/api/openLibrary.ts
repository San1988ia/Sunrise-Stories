import { Book } from "../types/Book";

export const searchBooks = async (query: string) => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Kunde inte hämta sökresultat");
  return await response.json();
};

export const getBookDetails = async (bookKey: string): Promise<Book> => {
  let normalizedKey = bookKey.startsWith("/") ? bookKey : `/${bookKey}`;

  if (normalizedKey.startsWith("/books/")) {
    const bookRes = await fetch(`https://openlibrary.org${normalizedKey}.json`);
    if (!bookRes.ok) throw new Error("Kunde inte hämta book-info");

    const bookData = await bookRes.json();
    const workKey = bookData.works?.[0]?.key;
    if (!workKey) throw new Error("Work-nyckel saknas");

    normalizedKey = workKey.startsWith("/") ? workKey : `/${workKey}`;
  }

  const response = await fetch(`https://openlibrary.org${normalizedKey}.json`);
  if (!response.ok) throw new Error("Kunde inte hämta bokinformation");

  const data = await response.json();

  let authors: string[] = [];

  if (Array.isArray(data.authors)) {
    const promises = data.authors.map(async (authorObj: any) => {
      const res = await fetch(
        `https://openlibrary.org${authorObj.author.key}.json`
      );
      if (res.ok) {
        const authorData = await res.json();
        return authorData.name;
      }
      return null;
    });

    const names = await Promise.all(promises);
    authors = names.filter((name): name is string => Boolean(name));
  }

  return {
    key: normalizedKey,
    title: data.title,
    author_name: authors,
    cover_i: data.covers?.[0],
    first_sentence:
      typeof data.first_sentence === "string"
        ? data.first_sentence
        : data.first_sentence?.value || "",
    subject: data.subjects?.slice(0, 5) || [],
    page_count: data.number_of_pages || 0,
    description:
      typeof data.description === "string"
        ? data.description
        : data.description?.value || "",
    table_of_contents: data.table_of_contents || [],
  };
};
