const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    { id: 1, title: "Book 1", author: "Author 1" },
    { id: 2, title: "Book 2", author: "Author 2" }
];

app.get("/books", (req, res) => {
    res.json(books);
});

app.post("/books", (req, res) => {
    const newBook = { id: books.length + 1, ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books[bookIndex] = { id: bookId, ...req.body };
    res.json(books[bookIndex]);
});

app.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(book => book.id !== bookId);
    res.json({ message: "Book deleted successfully" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

