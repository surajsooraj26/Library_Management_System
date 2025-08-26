const book = require("../models/book");
const issuedBook = require("../models/issuedBooks");
const returnedBook = require("../models/returnedBooks");
// Add a new book
const addBook = async (req, res) => {
  const { bookid, title, author, category } = req.body;

  try {
    const newBook = new book({
      bookid,
      title,
      author,
      category,
      status: "available",
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
// Get all books
const getBooks = async (req, res) => {
  const { bookid, title, author, category } = req.query;
  const filter = {};

  if (bookid) filter.bookid = bookid;
  if (title) filter.title = { $regex: title, $options: "i" }; // case-insensitive search
  if (author) filter.author = { $regex: author, $options: "i" };
  if (category) filter.category = category;
  try {
    const books = await book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Update a book
const updateBook = async (req, res) => {
  const { bookid } = req.params;
  const updateData = req.body;

  try {
    const updatedBook = await book.findOneAndUpdate({ bookid }, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete a book
const deleteBook = async (req, res) => {
  const { bookid } = req.params;

  try {
    const deletedBook = await book.findOneAndDelete({ bookid });
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};

// Issue a book
const issueBook = async (req, res) => {
  if (
    !req.body ||
    !req.body.bookid ||
    !req.body.userid ||
    !req.body.issuedDate
  ) {
    return res.status(400).json({ error: "Book ID and User ID are required" });
  }
  const { bookid, userid, issuedDate } = req.body;
  try {
    const bookToIssue = await book.findOne({ bookid: bookid });
    if (!bookToIssue) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (bookToIssue.status !== "available") {
      return res.status(400).json({ error: "Book is not available for issue" });
    }
    bookToIssue.status = "checked out"; // Update status to checked out
    await bookToIssue.save();
    // Create an issue record
    const issueDateObj = new Date(issuedDate);
    const dueDateObj = new Date(issueDateObj);
    dueDateObj.setDate(issueDateObj.getDate() + 15); // add 15 days

    const issueRecord = new issuedBook({
      user: userid,
      bookid: bookid,
      issuedDate: issueDateObj,
      dueDate: dueDateObj,
    });
    await issueRecord.save();
    res
      .status(200)
      .json({ message: "Book issued successfully", book: bookToIssue });
  } catch (error) {
    res.status(500).json({ error: "Failed to issue book" });
    console.log(error);
  }
};

// Return a book
const returnBook = async (req, res) => {
  if (!req.body || !req.body.bookid) {
    return res.status(400).json({ error: "Book ID  required" });
  }
  if (!req.body.returnDate) {
    returnDate = new Date(); // Set return date to current date if not provided
  }
  const { bookid } = req.body;

  try {
    const bookToReturn = await issuedBook.findOne({
      bookid: bookid,
    });
    if (!bookToReturn) {
      return res.status(404).json({ error: "Issued book not found" });
    }
    // Update the book status to available
    const bookDetails = await book.findOne({ bookid: bookid });
    if (!bookDetails) {
      return res.status(404).json({ error: "Book details not found" });
    }
    bookDetails.status = "available"; // Update status to available
    await bookDetails.save();
    // Create a return record
    const returnRecord = new returnedBook({
      user: bookToReturn.user,
      bookid: bookid,
      issuedDate: bookToReturn.issuedDate,
      returnDate: returnDate,
      dueDate: bookToReturn.dueDate,
    });
    await returnRecord.save();
    // Delete the issued book record
    await issuedBook.deleteOne({
      bookid: bookToReturn.bookid,
      user: bookToReturn.user,
    });

    res.status(200).json({
      message: "Book returned successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to return book" });
  }
};

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
  issueBook,
  returnBook,
};
