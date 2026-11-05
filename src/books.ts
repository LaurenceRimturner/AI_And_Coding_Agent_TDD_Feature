import type { Book, GenreFilter } from "./types";

type Filter = {
  genre: GenreFilter;
  query: string;
};

export function filterBooks(books: Book[], { genre, query }: Filter): Book[] {
  const normalizedQuery = query.trim().toLowerCase();
  return books.filter(
    (book) =>
      (genre === "all" || book.genre === genre) &&
      book.title.toLowerCase().includes(normalizedQuery)
  );
}

export function toggleRead(books: Book[], id: string): Book[] {
  return books.map((book) =>
    book.id === id ? { ...book, isRead: !book.isRead } : book
  );
}

export function removeBook(books: Book[], id: string): Book[] {
  return books.filter((book) => book.id !== id);
}

export function countRead(books: Book[]): number {
  return books.filter((book) => book.isRead).length;
}

/**
 * Returns a sorted copy. Title and author sort alphabetically, rating from
 * highest to lowest ("asc"); "desc" reverses that. Equal books keep their order.
 */
export function sortBooks(
  books: Book[],
  key: "title" | "author" | "rating",
  direction: "asc" | "desc" = "asc"
): Book[] {
  const compare = (a: Book, b: Book): number =>
    key === "rating"
      ? b.rating - a.rating
      : a[key].localeCompare(b[key], undefined, { sensitivity: "base" });
  const sign = direction === "asc" ? 1 : -1;
  return [...books].sort((a, b) => sign * compare(a, b));
}

/** Average of all rated books, rounded to one decimal. `null` if no book is rated. */
export function averageRating(books: Book[]): number | null {
  const rated = books.filter((book) => book.rating > 0);
  if (rated.length === 0) {
    return null;
  }
  const sum = rated.reduce((total, book) => total + book.rating, 0);
  return Math.round((sum / rated.length) * 10) / 10;
}
