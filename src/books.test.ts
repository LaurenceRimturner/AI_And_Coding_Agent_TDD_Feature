import { describe, expect, test } from "vitest";
import {
  averageRating,
  countRead,
  filterBooks,
  removeBook,
  sortBooks,
  toggleRead,
} from "./books";
import { initialBooks } from "./data";

describe("filterBooks", () => {
  test("filters by genre", () => {
    const result = filterBooks(initialBooks, { genre: "sci-fi", query: "" });
    expect(result.map((book) => book.title)).toEqual(["Dune", "Neuromancer"]);
  });

  test("returns all books for the genre 'all'", () => {
    expect(filterBooks(initialBooks, { genre: "all", query: "" })).toHaveLength(
      5,
    );
  });

  test("finds a title regardless of upper and lower case", () => {
    const result = filterBooks(initialBooks, { genre: "all", query: "dune" });
    expect(result.map((book) => book.title)).toEqual(["Dune"]);
  });

  test("ignores spaces around the search text", () => {
    const result = filterBooks(initialBooks, { genre: "all", query: " Dune " });
    expect(result).toHaveLength(1);
  });
});

describe("toggleRead", () => {
  test("toggles the read status of one book", () => {
    const result = toggleRead(structuredClone(initialBooks), "b3");
    expect(result.find((book) => book.id === "b3")?.isRead).toBe(true);
    expect(result.find((book) => book.id === "b1")?.isRead).toBe(true);
  });

  test("does not change the original list", () => {
    const books = structuredClone(initialBooks);
    const result = toggleRead(books, "b3");
    expect(books.find((book) => book.id === "b3")?.isRead).toBe(false);
    expect(result).not.toBe(books);
  });
});

describe("removeBook", () => {
  test("removes the book with the given id", () => {
    const result = removeBook(initialBooks, "b2");
    expect(result.map((book) => book.id)).toEqual(["b1", "b3", "b4", "b5"]);
  });
});

describe("countRead", () => {
  test("counts the read books", () => {
    expect(countRead(initialBooks)).toBe(2);
  });
});

describe("averageRating", () => {
  test("averages only the rated books", () => {
    expect(averageRating(initialBooks)).toBe(4);
  });

  test("returns null when no book is rated", () => {
    expect(averageRating([initialBooks[2], initialBooks[4]])).toBeNull();
  });

  test("returns null for an empty list", () => {
    expect(averageRating([])).toBeNull();
  });
});

describe("sortBooks", () => {
  test("sorts by title ascending by default", () => {
    const result = sortBooks(initialBooks, "title");
    expect(result.map((book) => book.title)).toEqual([
      "Dune",
      "Gone Girl",
      "Neuromancer",
      "Sapiens",
      "The Hobbit",
    ]);
  });

  test("sorts by title descending", () => {
    const result = sortBooks(initialBooks, "title", "desc");
    expect(result.map((book) => book.title)).toEqual([
      "The Hobbit",
      "Sapiens",
      "Neuromancer",
      "Gone Girl",
      "Dune",
    ]);
  });

  test("sorts by author ascending", () => {
    const result = sortBooks(initialBooks, "author", "asc");
    expect(result.map((book) => book.author)).toEqual([
      "Frank Herbert",
      "Gillian Flynn",
      "J. R. R. Tolkien",
      "William Gibson",
      "Yuval Noah Harari",
    ]);
  });

  test("sorts by rating from highest to lowest by default", () => {
    const result = sortBooks(initialBooks, "rating");
    expect(result.map((book) => book.id)).toEqual([
      "b1",
      "b2",
      "b4",
      "b3",
      "b5",
    ]);
  });

  test("sorts by rating from lowest to highest when descending", () => {
    const result = sortBooks(initialBooks, "rating", "desc");
    expect(result.map((book) => book.id)).toEqual([
      "b3",
      "b5",
      "b4",
      "b2",
      "b1",
    ]);
  });

  test("keeps the original order of books with equal values", () => {
    const books = [
      { ...initialBooks[0], id: "x1", author: "Same Author" },
      { ...initialBooks[1], id: "x2", author: "Same Author" },
      { ...initialBooks[2], id: "x3", author: "Same Author" },
    ];
    expect(sortBooks(books, "author").map((book) => book.id)).toEqual([
      "x1",
      "x2",
      "x3",
    ]);
    expect(sortBooks(books, "author", "desc").map((book) => book.id)).toEqual([
      "x1",
      "x2",
      "x3",
    ]);
  });

  test("sorts text regardless of upper and lower case", () => {
    const books = [
      { ...initialBooks[0], id: "x1", title: "banana" },
      { ...initialBooks[0], id: "x2", title: "Apple" },
      { ...initialBooks[0], id: "x3", title: "cherry" },
    ];
    const result = sortBooks(books, "title");
    expect(result.map((book) => book.title)).toEqual([
      "Apple",
      "banana",
      "cherry",
    ]);
  });

  test("does not change the original list", () => {
    const books = structuredClone(initialBooks);
    const result = sortBooks(books, "title", "desc");
    expect(books.map((book) => book.id)).toEqual([
      "b1",
      "b2",
      "b3",
      "b4",
      "b5",
    ]);
    expect(result).not.toBe(books);
  });

  test("returns an empty list for an empty input", () => {
    expect(sortBooks([], "rating")).toEqual([]);
  });
});
