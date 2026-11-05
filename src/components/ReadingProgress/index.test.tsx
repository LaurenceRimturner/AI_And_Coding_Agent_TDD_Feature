import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ReadingProgress from ".";
import { initialBooks } from "../../data";

describe("ReadingProgress", () => {
  test("shows a hint when there are no books", () => {
    render(<ReadingProgress books={[]} />);
    expect(screen.getByText("No books yet")).toBeInTheDocument();
  });

  test("shows read count, total and percent", () => {
    render(<ReadingProgress books={initialBooks} />);
    expect(screen.getByText("2 of 5 books read (40 %)")).toBeInTheDocument();
  });

  test("uses the singular 'book' for exactly one book", () => {
    render(<ReadingProgress books={[initialBooks[0]]} />);
    expect(screen.getByText("1 of 1 book read (100 %)")).toBeInTheDocument();
  });

  test("shows 0 % when no book is read", () => {
    render(<ReadingProgress books={[initialBooks[2], initialBooks[4]]} />);
    expect(screen.getByText("0 of 2 books read (0 %)")).toBeInTheDocument();
  });

  test("shows 100 % when all books are read", () => {
    render(<ReadingProgress books={[initialBooks[0], initialBooks[1]]} />);
    expect(screen.getByText("2 of 2 books read (100 %)")).toBeInTheDocument();
  });

  test("rounds the percent to a whole number", () => {
    render(
      <ReadingProgress
        books={[initialBooks[0], initialBooks[2], initialBooks[4]]}
      />
    );
    expect(screen.getByText("1 of 3 books read (33 %)")).toBeInTheDocument();
  });
});
