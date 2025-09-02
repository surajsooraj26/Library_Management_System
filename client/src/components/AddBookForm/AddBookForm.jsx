import "./AddBookForm.css";
import { IoClose } from "react-icons/io5";
import { useAddBook } from "../../context/AddBookContext";
import { useState } from "react";
import api from "../../services/api";

function AddBookForm() {
  const { setShowAddBookForm } = useAddBook();
  const [notification, setNotification] = useState({ message: "", type: "" });

  const [book, setBook] = useState({
    bookid: "",
    title: "",
    author: "",
    genre: "",
    status: "",
    price: "",
    language: "",
    publisher: "",
    edition: "",
    shelf: "",
    coverImage: null, // keep in sync with backend (multer.single("coverImage"))
  });

  // Text/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  // File input
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setBook((prev) => ({ ...prev, coverImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // append only defined values; append file only if chosen
    Object.entries(book).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(key, val);
      }
    });

    // Helpful debug: see exactly what will be sent

    try {
      // Let axios set the proper multipart boundary automatically
      const res = await api.post("/books", formData);
      setNotification({ message: res.data.message, type: "success" });
      setBook({
        bookid: "",
        title: "",
        author: "",
        genre: "",
        status: "",
        price: "",
        language: "",
        publisher: "",
        edition: "",
        shelf: "",
        coverImage: null, // keep in sync with backend (multer.single("coverImage"))
      });
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      setNotification({ message: error.response.data.error, type: "error" });
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="add-form">
        <div className="head">
          <h2>Add Book</h2>
          <IoClose
            onClick={() => setShowAddBookForm(false)}
            className="close-icon"
          />
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="addbook">
            <div className="addbook-1">
              <div className="form-group">
                <label htmlFor="id">Id</label>
                <input
                  type="number"
                  id="id"
                  name="bookid"
                  value={book.bookid}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select
                  name="genre"
                  id="genre"
                  value={book.genre}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select genre
                  </option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="mystery">Mystery</option>
                  <option value="fantasy">Fantasy</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={book.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="addbook-2">
              <div className="form-group">
                <label htmlFor="coverImage">Cover</label>
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="language">Language</label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  value={book.language}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="publisher">Publisher</label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  value={book.publisher}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edition">Edition</label>
                <input
                  type="text"
                  id="edition"
                  name="edition"
                  value={book.edition}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="shelf">Shelf</label>
                <input
                  type="text"
                  id="shelf"
                  name="shelf"
                  value={book.shelf}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkout-btn">
                <button type="submit" className="btn border">
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBookForm;
