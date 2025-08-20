import "./AddBookForm.css";
import { IoClose } from "react-icons/io5";
import { useAddBook } from "../../context/AddBookContext";
function AddBookForm() {
  const { setShowAddBookForm } = useAddBook();
  return (
    <div className="add-form">
      <div className="head">
        <h2>Add Book</h2>
        <IoClose
          onClick={() => setShowAddBookForm(false)}
          className="close-icon"
        />
      </div>
      <form>
        <div className="addbook">
          <div className="addbook-1">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" id="author" name="author" required />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select name="genre" id="genre">
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="mystery">Mystery</option>
                <option value="fantasy">Fantasy</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" name="price" required />
            </div>
          </div>
          <div className="addbook-2">
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <input type="text" id="language" name="language" required />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input type="text" id="publisher" name="publisher" required />
            </div>
            <div className="form-group">
              <label htmlFor="edition">Edition</label>
              <input type="text" id="edition" name="edition" required />
            </div>
            <div className="form-group shelf">
              <label htmlFor="shelf">Shelf</label>
              <input type="text" id="shelf" name="shelf" required />
              <button type="submit" className="btn submit-btn">
                Add Book
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBookForm;
