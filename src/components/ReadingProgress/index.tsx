import type { Book } from "../../types";
import { countRead } from "../../books";

type ReadingProgressProps = {
  books: Book[];
};

export default function ReadingProgress({ books }: ReadingProgressProps) {
  if (books.length === 0) {
    return <p className="reading-progress">No books yet</p>;
  }
  const read = countRead(books);
  const percent = Math.round((read / books.length) * 100);
  const noun = books.length === 1 ? "book" : "books";
  return (
    <p className="reading-progress">
      {`${read} of ${books.length} ${noun} read (${percent} %)`}
    </p>
  );
}
