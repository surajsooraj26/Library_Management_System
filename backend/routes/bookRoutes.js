const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  issueBook,
  returnBook,
} = require("../controllers/bookController");
// Add a new book
router.post("/", protect, adminOnly, addBook);
// Get all books
router.get("/", protect, getBooks);
// Update a book
router.put("/:bookid", protect, adminOnly, updateBook);
// Delete a book
router.delete("/:bookid", protect, adminOnly, deleteBook);
// Issue a book
router.post("/issue", protect, adminOnly, issueBook);
// Return a book
router.post("/return", protect, adminOnly, returnBook);

module.exports = router;
