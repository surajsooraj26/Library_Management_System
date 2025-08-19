import "./CheckoutForm.css";
import { IoClose } from "react-icons/io5";
import { useCheckout } from "../../context/CheckoutContext.jsx";
import { useState, useEffect } from "react";
function CheckoutForm() {
  const { setShowCheckoutForm } = useCheckout();
  const [isChecked, setIsChecked] = useState(true);
  const [timestamp, setTimestamp] = useState("");
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
  return (
    <div className="checkout-form">
      <div className="head">
        <h2>Checkout</h2>
        <IoClose
          onClick={() => setShowCheckoutForm(false)}
          className="close-icon"
        />
      </div>
      <div className="checkout">
        <div className="checkout-1">
          <form>
            <div className="form-group">
              <label htmlFor="book">Book</label>
              <div className="option">
                <select>
                  <option value="BookId">ID</option>
                  <option value="BookTitle">Title</option>
                  <option value="BookAuthor">Author</option>
                  <option value="BookGenre">Genre</option>
                </select>
                <input type="text" id="book" name="book" required />
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
            <button type="submit" className="btn border">
              Checkout
            </button>
          </form>
        </div>
        <div className="checkout-2">
          <div className="book">
            <div className="book-1">
              <img
                src="https://dcbookstore.com/uploads/product/images/32440922957418-visma.JPG"
                alt=""
              />
            </div>
            <div className="book-2">
              <h3>The Great Gatsby</h3>
              <p className="book-id">1357</p>
              <p className="author">F. Scott Fitzgerald</p>
              <p className="genre">Fiction</p>
            </div>
          </div>
          <div className="user">
            <div className="user-1">
              <img
                src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                alt=""
              />
              <div className="user-2">
                <p>John Doe</p>
                <p>john.doe@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
