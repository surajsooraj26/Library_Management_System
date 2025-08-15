import "./CheckoutForm.css";
import { IoClose } from "react-icons/io5";
import { useCheckout } from "../../context/CheckoutContext.jsx";
function CheckoutForm() {
  const { setShowCheckoutForm } = useCheckout();
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
                type="date"
                id="checkout-date"
                name="checkout-date"
                required
              />
              <div className="checkbox-date">
                <input type="checkbox" name="" id="" /> Use current Timestamp
              </div>
            </div>
            <button type="submit" className="btn border">
              Checkout
            </button>
          </form>
        </div>
        <div className="checkout-2">
          <p>
            Please fill out the form to checkout a book. Ensure that all fields
            are completed accurately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
