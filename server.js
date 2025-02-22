const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// تشغيل الخادم
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// قاعدة بيانات وهمية (مصفوفة من الكتب)
let books = [
    { id: 1, title: "كتاب 1", author: "المؤلف 1" },
    { id: 2, title: "كتاب 2", author: "المؤلف 2" }
];

// 📌 1️⃣ قراءة جميع الكتب (GET /books)
app.get("/books", (req, res) => {
    res.json(books);
});

// 📌 2️⃣ إضافة كتاب جديد (POST /books)
app.post("/books", (req, res) => {
    const newBook = { id: books.length + 1, ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
});

// 📌 3️⃣ تحديث كتاب (PUT /books/:id)
app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ message: "الكتاب غير موجود" });
    }

    books[bookIndex] = { id: bookId, ...req.body };
    res.json(books[bookIndex]);
});

// 📌 4️⃣ حذف كتاب (DELETE /books/:id)
app.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(book => book.id !== bookId);
    res.json({ message: "تم حذف الكتاب بنجاح" });
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});