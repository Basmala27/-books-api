const express = require('express');
const app = express();
app.use(express.json());

// Hardcoded array to store books in memory
let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

// CREATE: Add a new book (POST)
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// READ: Get all books (GET)
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// READ: Get a book by ID (GET)
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.status(200).json(book);
});

// UPDATE: Update an existing book (PUT)
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  const { title, author } = req.body;
  book.title = title;
  book.author = author;
  res.status(200).json(book);
});

// DELETE: Delete a book (DELETE)
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');

  books.splice(bookIndex, 1);
  res.status(200).send('Book deleted');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

