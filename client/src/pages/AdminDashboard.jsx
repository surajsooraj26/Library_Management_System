import "./AdminDashboard.css";
import AssignBook from "../components/AssignBook.jsx";
import ReturnBook from "../components/ReturnBook.jsx";
import AddBook from "../components/AddBook.jsx";
import UserRegistration from "../components/UserRegistration.jsx";
import { useState } from "react";

function AdminDashboard() {
  const [bookassign, setBookAssign] = useState(false);
  const [bookreturn, setBookReturn] = useState(false);
  const [addbook, setAddBook] = useState(false);
  const [reg, setReg] = useState(false);
  const showAssign = () => {
    setBookAssign(true);
  };
  const showReturn = () => {
    setBookReturn(true);
  };
  const ShowAddbook = () => {
    setAddBook(true);
  };
  const ShowReg = () => {
    setReg(true);
  };

  return (
    <div className="admin-dashboard">
      {bookassign && <AssignBook setBookAssign={setBookAssign} />}
      {bookreturn && <ReturnBook setBookReturn={setBookReturn} />}
      {addbook && <AddBook setAddBook={setAddBook} />}
      {reg && <UserRegistration setReg={setReg} />}
      <h1>Admin Dashboard</h1>
      <p className="msg">Manage Library operations efficiently</p>
      <div className="admin-actions">
        <button className="action-btn" onClick={showAssign}>
          Assign Book
        </button>
        <button className="action-btn" onClick={showReturn}>
          Process Returns
        </button>
      </div>
      <button className="action-btn" onClick={ShowAddbook}>
        Add Books
      </button>
      <button className="action-btn" onClick={ShowReg}>
        Manage User Registration
      </button>
      <div className="recent">
        <h2>Recent Activities</h2>
        <div className="recent-card">
          <div className="card-list">
            <div className="img">
              <img src="" alt="image" />
            </div>

            <div className="card-content">
              <p>Description</p>
              <p className="desc">title</p>
            </div>
          </div>

          <div className="card-list">
            <div className="img">
              <img src="" alt="image" />
            </div>

            <div className="card-content">
              <p>Description</p>
              <p className="desc">title</p>
            </div>
          </div>

          <div className="card-list">
            <div className="img">
              <img src="" alt="image" />
            </div>

            <div className="card-content">
              <p>Description</p>
              <p className="desc">title</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
