import "./AdminBooks.css";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import AddBookForm from "../../../components/AddBookForm/AddBookForm";
import { useAddBook } from "../../../context/AddBookContext.jsx";
import api from "../../../services/api";

function AdminBooks() {
  const [bookPage, setBookPage] = useState(1);
  const [showbookdetails, setShowBookDetails] = useState(false);
  const booksPerPage = 5;
  const { showAddBookForm, setShowAddBookForm } = useAddBook();
  // Sample book data
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books", { withCredentials: true });
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  // pagination calculation
  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (bookPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  const bookDetails = (_id) => {
    console.log("Book details for:", _id);
  };

  return (
    <div className="desktop-container">
      {showAddBookForm && <AddBookForm />}
      <div className="head">
        <h2>Books</h2>
        <button
          className="btn add-book"
          onClick={() => setShowAddBookForm((prev) => !prev)}
        >
          Add Book
        </button>
      </div>

      <form action="">
        <div className="search-box books">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for books"
            className="search-input books-input"
          />
        </div>
      </form>

      <div className="table-container">
        <div className="table-wrapper">
          <table className="table books-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book, index) => (
                <tr key={index} onClick={() => bookDetails(book._id)}>
                  <td className="title">{book.bookid}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.status}</td>
                  <td className="timestamp">
                    <a>Edit</a> | <a>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <a
            onClick={(e) => {
              e.preventDefault();
              setBookPage((p) => Math.max(1, p - 1));
            }}
          >
            &laquo;
          </a>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <a
                key={pageNum}
                onClick={(e) => {
                  e.preventDefault();
                  setBookPage(pageNum);
                }}
                className={bookPage === pageNum ? "active" : ""}
              >
                {pageNum}
              </a>
            );
          })}

          <a
            onClick={(e) => {
              e.preventDefault();
              setBookPage((p) => Math.min(totalPages, p + 1));
            }}
          >
            &raquo;
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminBooks;
