import { useState } from "react";
import api from "../services/api";
function ReturnBook({ setBookReturn }) {
  const [details, setDetails] = useState(null);
  const close = () => {
    setBookReturn(false);
  };
  //Finding book details
  const FindDetails = async (e) => {
    const bookdetails = await api.get(`/books?bookid=${e.target.value}`);
    setDetails(bookdetails.data[0]);
    if (!e.target.value) setDetails(null);
  };

  //Issue Book
  const issueBook = async (event) => {
    event.preventDefault();
    const data = { bookid: details.bookid };
    try {
      const issue = await api.post("/books/return", data);
      setBookReturn(false);
    } catch (err) {
      console.log({ message: "Unexpected error" });
    }
  };

  return (
    <div className="assign-book">
      <h1>Return Book</h1>
      <form onSubmit={issueBook} className="assign-book-form">
        <div className="row">
          <div className="form-group bookid">
            <label htmlFor="book">Book Id</label>
            <input
              type="text"
              name="bookid"
              placeholder="Enter Book ID"
              onChange={FindDetails}
              required
            />
          </div>
          <div className="form-group bookname">
            <label htmlFor="title">Book Name</label>
            <input
              type="text"
              name="title"
              value={!details ? "" : details.title}
              readOnly
              placeholder="Enter Book Name"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group auther">
            <label htmlFor="auther">Auther</label>
            <input
              type="text"
              name="auther"
              placeholder="Enter Auther"
              value={!details ? "" : details.author}
              readOnly
              required
            />
          </div>
          <div className="form-group category">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              value={!details ? "" : details.category}
              readOnly
              required
            />
          </div>
        </div>

        <div className="assign-button">
          <button onClick={close} className="close-btn" type="button">
            close
          </button>
          <button type="submit">Mark Return</button>
        </div>
      </form>
    </div>
  );
}
export default ReturnBook;
