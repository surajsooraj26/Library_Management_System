import { useState } from "react";
import api from "../services/api";
function AddBook({ setAddBook }) {
  const [bookid, setBookId] = useState(null);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);

  const close = () => {
    setAddBook(false);
  };

  //Issue Book
  const addbook = async (event) => {
    event.preventDefault();
    const data = {
      bookid,
      title,
      author,
      category,
    };
    try {
      const add = await api.post("/books", data);
      setAddBook(false);
    } catch (err) {
      console.log({ message: "Unexpected Error" });
    }
  };

  return (
    <div className="assign-book">
      <h1>Add New Book</h1>
      <form onSubmit={addbook} className="assign-book-form">
        <div className="row">
          <div className="form-group bookid">
            <label htmlFor="book">Book Id</label>
            <input
              type="text"
              name="bookid"
              placeholder="Enter Book ID"
              onChange={(e) => {
                setBookId(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group bookname">
            <label htmlFor="title">Book Name</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Book Name"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group auther">
            <label htmlFor="auther">Author</label>
            <input
              type="text"
              name="author"
              placeholder="Enter Auther"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group category">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Auther"
              required
              list="options"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <datalist id="options">
              <option value="Novel">Novel</option>
              <option value="Poem">Poem</option>
              <option value="Story">Story</option>
            </datalist>
          </div>
        </div>

        <div className="assign-button">
          <button onClick={close} className="close-btn" type="button">
            close
          </button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
export default AddBook;
