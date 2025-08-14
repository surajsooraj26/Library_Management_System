import "./CheckoutForm.css";
import { IoClose } from "react-icons/io5";
import { useCheckout } from "../../context/CheckoutContext.jsx";
function CheckoutForm() {
  const { setShowCheckoutForm } = useCheckout();
  return (
    <div className="checkout-form">
      <div className="head">
        <h2>Checkout Form</h2>
        <IoClose
          onClick={() => setShowCheckoutForm(false)}
          className="close-icon"
        />
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <input type="text" id="user" name="user" required />
        </div>
        <div className="form-group">
          <label htmlFor="book">Book</label>
          <input type="text" id="book" name="book" required />
        </div>
        <div className="form-group">
          <label htmlFor="checkout-date">Checkout Date</label>
          <input type="date" id="checkout-date" name="checkout-date" required />
        </div>
        <div className="form-group">
          <label htmlFor="return-date">Return Date</label>
          <input type="date" id="return-date" name="return-date" required />
        </div>
        <button type="submit" className="btn">
          Checkout
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
