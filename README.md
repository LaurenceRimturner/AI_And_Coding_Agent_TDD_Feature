# TDD with the Agent

(difficulty: 🔥🔥)

Bookshelf works and has tests. Your job is to add two features **test first**: you decide what the code should do and let the agent write the tests before it writes any code.

## The features

### 1. `sortBooks` in `src/books.ts`

```ts
sortBooks(books: Book[], key: "title" | "author" | "rating", direction?: "asc" | "desc"): Book[]
```

- The default direction is `"asc"`.
- It returns a **new** array and does not change the original.
- `"title"` and `"author"` sort alphabetically, **regardless of upper and lower case** (`"apple"` comes before `"Banana"`).
- `"rating"` sorts by the number of stars. **Books without a rating (0) always come last**, in both directions.
- Books that are equal keep their original order.

### 2. `ReadingProgress` in `src/components/ReadingProgress`

A component with the prop `books` that shows one line of text:

- without books: `No books yet.`
- otherwise: `<read> of <total> books read (<percent> %)`, for example `3 of 5 books read (60 %)`
- with exactly one book, it says `book` instead of `books`
- the percent value is rounded to a whole number (`1 of 3` is `33 %`)

## Tasks

Work in a git repository (`git init -b main`, `git add .`, `git commit -m "Initial commit"`). Use Claude Code in the **Manual mode** (check the mode below the input at every start) and keep your permission log (see the Bug Hunt challenge for the table).

1. Ask the agent to write the tests for `sortBooks` **from the specification above, without implementing anything**. Read every test. Does it check what the specification says? Is an edge case missing (empty list, unrated books in `"desc"`, equal books)? Ask for more tests.
2. Run `npm run test:run`. The new tests must be **red**, and red for the right reason ("sortBooks is not a function" is not a good reason, a failing assertion is). Commit the tests.
3. Ask the agent to implement `sortBooks` until the tests are green. Check `git diff`: did it change a test?
4. **Check the tests:** break the implementation on purpose (for example let `"rating"` ignore the unrated books). Does a test turn red? If not, the tests are not good enough.
5. Repeat steps 1 to 4 for `ReadingProgress`.
6. Wire both features into `App.tsx`: a select "Sort by" and the `ReadingProgress` line. Add a test for the sort select.
7. Run `npm run check` and `npm run test:run`, then look at the app in the browser.

### Questions for the end

- When did the agent write a test that only repeated its own implementation?
- Which edge cases did you have to ask for?
- Was it faster than writing the tests yourself? Was it better?

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app in the browser
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
