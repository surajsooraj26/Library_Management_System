import "./CheckoutForm.css";
import { IoClose } from "react-icons/io5";
import { useCheckout } from "../../context/CheckoutContext.jsx";
import { useState, useEffect } from "react";
import api from "../../services/api.js";
function CheckoutForm() {
  const { setShowCheckoutForm } = useCheckout();
  const [isChecked, setIsChecked] = useState(true);
  const [timestamp, setTimestamp] = useState("");
  const [bookid, setBookId] = useState("");
  const [book, setBook] = useState(null);
  const user = {
    id: "1234",
    profile:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    name: "John Doe",
    email: "john.doe@example.com",
  };
  const getTimestamp = (mode = "local") => {
    const now = new Date();
    if (mode === "local") {
      // For datetime-local input (24h)
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } else if (mode === "12h") {
      // For display in 12-hour format
      return now.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  useEffect(() => {
    if (isChecked && !timestamp) {
      setTimestamp(getTimestamp("local"));
    }
  }, [isChecked, timestamp]);

  useEffect(() => {
    if (isChecked && !timestamp) {
      setTimestamp(getTimestamp("local"));
    }
  }, [isChecked, timestamp]);

  const handleCheck = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    if (checked) {
      setTimestamp(getTimestamp("local"));
    } else {
      setTimestamp(""); // optional: clear on uncheck
    }
  };

  const searchBook = async () => {
    const res = await api.get("/books", {
      params: { bookid }, // or { title, author, category }
    });

    if (res.data.length > 0) {
      setBook(res.data[0]); // if you want a list
    } else {
      setBook(null);
    }
  };

  return (
    <div className="add-form">
      <form>
        <div className="head">
          <h2>Checkout</h2>
          <IoClose
            onClick={() => setShowCheckoutForm(false)}
            className="close-icon"
          />
        </div>
        <div className="checkout">
          <div className="checkout-1">
            <div className="form-group">
              <label htmlFor="book">Book</label>
              <div className="option">
                <select>
                  <option value="BookId">ID</option>
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="category">Category</option>
                </select>
                <input
                  type="text"
                  id="book"
                  onChange={(e) => setBookId(e.target.value)}
                  name="book"
                  required
                />
                <button type="button" className="btn" onClick={searchBook}>
                  Search
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="user">User</label>
              <div className="option">
                <select>
                  <option value="UserId">ID</option>
                  <option value="UserName">Name</option>
                  <option value="UserEmail">Email</option>
                </select>
                <input type="text" id="user" name="user" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="checkout-date">Checkout Date</label>
              <input
                type="datetime-local"
                id="checkout-date"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                name="checkout-date"
                required
              />
              <div className="checkbox-date">
                <input
                  type="checkbox"
                  className="check-box"
                  name=""
                  id=""
                  checked={isChecked}
                  onChange={handleCheck}
                />
                <p className="checkbox-label">Use current Timestamp</p>
              </div>
            </div>
          </div>
          <div className="checkout-2">
            <div className="book">
              <div className="book-1">
                <img
                  src={
                    book !== null
                      ? book.coverImage
                      : "https://i.pinimg.com/736x/bf/f0/4d/bff04d61ca0da85861456f44048a14c8.jpg"
                  }
                  alt="cover"
                />
              </div>
              <div className="book-2">
                <h3>{book !== null ? book.title : "No Data"}</h3>
                <p className="book-id">
                  {book !== null ? book.bookid : "No Data"}
                </p>
                <p className="author">
                  {book !== null ? book.author : "No Data"}
                </p>
                <p className="genre">
                  {book !== null ? book.genre : "No Data"}
                </p>
              </div>
            </div>
            <div className="user">
              <div className="user-1">
                <img src={user.profile} alt="profile" />
                <div className="user-2">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
            <div className="checkout-btn">
              <button type="submit" className="btn border">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
