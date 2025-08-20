import "./AdminBooks.css";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AddBookForm from "../../../components/AddBookForm/AddBookForm";
import { useAddBook } from "../../../context/AddBookContext.jsx";
function AdminBooks() {
  const [bookPage, setBookPage] = useState(1);
  const windowSize = 5;
  const start = Math.max(1, bookPage - windowSize + 1);
  const { showAddBookForm, setShowAddBookForm } = useAddBook();

  const books = [
    {
      slno: 1,
      title: "The Silent Observer",
      author: "Ethan Walker",
      genre: "Mystery",
    },
    {
      slno: 2,
      title: "Whispers in the Wind",
      author: "Olivia Hayes",
      genre: "Romance",
    },
    {
      slno: 3,
      title: "Echoes of the Past",
      author: "Caleb Bennett",
      genre: "Historical Fiction",
    },
    {
      slno: 4,
      title: "The Hidden Truth",
      author: "Ava Thorne",
      genre: "Thriller",
    },
    {
      slno: 5,
      title: "The Silent Observer",
      author: "Ethan Walker",
      genre: "Mystery",
    },
  ];
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
          <table className="table .books-table">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td className="title">{book.slno}</td>
                  <td className="">{book.title}</td>
                  <td className="timestamp">{book.author}</td>
                  <td className="timestamp">{book.genre}</td>
                  <td className="timestamp">
                    <a>Edit</a>|<a>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <a
            onClick={(e) => {
              e.preventDefault();
              setBookPage((p) => Math.max(1, p - 1));
            }}
          >
            &laquo;
          </a>

          {[...Array(windowSize)].map((_, i) => {
            const pageNum = start + i;
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
              setBookPage((p) => p + 1);
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
