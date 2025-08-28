import "./CheckoutForm.css";
import { IoClose } from "react-icons/io5";
import { useCheckout } from "../../context/CheckoutContext.jsx";
import { useState, useEffect } from "react";
import api from "../../services/api.js";
function CheckoutForm() {
  const { setShowCheckoutForm } = useCheckout();
  const [isChecked, setIsChecked] = useState(true);
  const [searchField, setSearchField] = useState("bookid");
  const [userField, setUserField] = useState("email");
  const [timestamp, setTimestamp] = useState("");
  const [bookresult, setBookResult] = useState([]);
  const [userresult, setUserResult] = useState([]);
  const [bookquery, setBookQuery] = useState("");
  const [userquery, setUserQuery] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);

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
  const CheckStatus = async (book) => {
    if (book.status === "available") {
      return 0;
    } else {
      try {
        const res = await api.get("/books/issue", {
          params: { bookid: book.bookid },
        });
        setUser(res.data.user); // now inside try block
        return res.data; // return the response so caller can use it
      } catch (error) {
        setNotification({ message: "❎ Error issuing book", type: "error" });
        setTimeout(() => setNotification(""), 3000);
        return null; // return something fallback
      }
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
      setTimestamp("");
    }
  };

  useEffect(() => {
    if (bookquery.trim() === "") {
      setBookResult([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.get("/books", {
          params: { [searchField]: bookquery },
        });

        setBookResult(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setUser(null);
    setBook(null);
  }, [bookquery, searchField]);

  useEffect(() => {
    if (userquery.trim() === "") {
      setUserResult([]);
      return;
    }
    const FetchUser = async () => {
      try {
        const res = await api.get("/user", {
          params: { [userField]: userquery },
        });
        setUserResult(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchUser();
  }, [userField, userquery]);

  const IssueBook = async (e) => {
    e.preventDefault();
    try {
      if (book.status == "available") {
        const body = {
          userid: user._id,
          bookid: book.bookid,
          issuedDate: timestamp,
        };

        const res = await api.post("/books/issue", body);
        setNotification({
          message: res.data.message,
          type: "success",
        });
      } else {
        const body = {
          bookid: book.bookid,
          returnDate: timestamp,
        };
        const res = await api.post("/books/return", body);
        setNotification({
          message: res.data.message,
          type: "success",
        });
      }
      setBook(null);
      setUser(null);
      setBookQuery("");
      setUserQuery("");

      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      setNotification({ message: "❎ Error issuing book", type: "error" });
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
        <form onSubmit={IssueBook}>
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
                  <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  >
                    <option value="bookid">ID</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="category">Category</option>
                  </select>
                  <input
                    type="text"
                    id="book"
                    value={bookquery}
                    onChange={(e) => setBookQuery(e.target.value)}
                    name="book"
                  />
                </div>
              </div>
              {bookquery !== "" && (
                <div
                  style={{
                    position: "fixed",
                    maxHeight: "150px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    marginTop: "10px",
                    padding: "5px",
                    width: "40%",
                    backgroundColor: "white",
                  }}
                >
                  {bookresult.length > 0
                    ? bookresult.map((book) => (
                        <div
                          key={book._id}
                          style={{
                            padding: "5px",
                            borderBottom: "1px solid #eee",
                            cursor: "pointer",
                          }}
                          onClick={async () => {
                            setBook(book);
                            await CheckStatus(book);
                            setBookQuery("");
                          }} // click to set value
                        >
                          {book.title} — {book.author}
                        </div>
                      ))
                    : bookquery && <div>No results found</div>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="user">User</label>
                <div className="option">
                  <select
                    value={userField}
                    onChange={(e) => setUserField(e.target.value)}
                  >
                    <option value="email">Email</option>
                    <option value="name">Name</option>
                  </select>
                  <input
                    type="text"
                    id="user"
                    name="user"
                    value={userquery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    disabled={book !== null && book.status === "checked out"}
                  />
                </div>
              </div>
              {userquery !== "" && (
                <div
                  style={{
                    position: "fixed",
                    maxHeight: "150px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    marginTop: "10px",
                    padding: "5px",
                    width: "40%",
                    backgroundColor: "white",
                  }}
                >
                  {userresult.length > 0
                    ? userresult.map((user) => (
                        <div
                          key={user._id}
                          style={{
                            padding: "5px",
                            borderBottom: "1px solid #eee",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setUser(user);
                            setUserQuery("");
                          }} // click to set value
                        >
                          {user.name} — {user.email}
                        </div>
                      ))
                    : userquery && <div>No results found</div>}
                </div>
              )}
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
                  {book !== null ? (
                    <img
                      src={
                        book !== null
                          ? book.coverImage
                          : "https://i.pinimg.com/736x/bf/f0/4d/bff04d61ca0da85861456f44048a14c8.jpg"
                      }
                      alt="cover"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="book-2">
                  <h3>{book !== null ? book.title : ""}</h3>
                  <p className="book-id">{book !== null ? book.bookid : ""}</p>
                  <p className="author">{book !== null ? book.author : ""}</p>
                  <p className="genre">{book !== null ? book.genre : ""}</p>
                </div>
              </div>
              <div className="user">
                <div className="user-1">
                  {user !== null ? (
                    <img
                      src={
                        user !== null
                          ? user.profilePicture
                          : "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                      }
                      alt="profile"
                    />
                  ) : (
                    ""
                  )}

                  <div className="user-2">
                    <p>{user !== null ? user.name : ""}</p>
                    <p>{user !== null ? user.email : ""}</p>
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
    </>
  );
}

export default CheckoutForm;
