import { useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm.jsx";
function ActivityLog() {
  const [activityPage, setActivityPage] = useState(1);
  const { showCheckoutForm, setShowCheckoutForm } = useCheckout();
  const windowSize = 5;
  const start = Math.max(1, activityPage - windowSize + 1);

  const activities = [
    {
      user: "John Doe",
      action: "Added a new book",
      timestamp: "2023-10-01 12:00:00",
    },
    {
      user: "Jane Smith",
      action: "Removed a book",
      timestamp: "2023-10-02 14:30:00",
    },
    {
      user: "Caleb Bennett",
      action: "Updated book details",
      timestamp: "2023-10-03 09:15:00",
    },
    {
      user: "Ava Thorne",
      action: "Viewed book details",
      timestamp: "2023-10-04 11:45:00",
    },
    {
      user: "Ethan Walker",
      action: "Checked out a book",
      timestamp: "2023-10-05 16:20:00",
    },
  ];
  return (
    <div className="desktop-container">
      {showCheckoutForm && <CheckoutForm />}
      <div className="head">
        <h2>Activity Logs</h2>
        <button className="btn" onClick={() => setShowCheckoutForm(true)}>
          Check Out
        </button>
      </div>

      <div className="table-container">
        <div className="table-wrapper">
          <table className="table .books-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td className="title">{activity.user}</td>
                  <td className="timestamp">{activity.action}</td>
                  <td className="timestamp">{activity.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <a
            onClick={(e) => {
              e.preventDefault();
              setActivityPage((p) => Math.max(1, p - 1));
            }}
          >
            &laquo;
          </a>

          {[...Array(windowSize)].map((_, i) => {
            const pageNum = start + i;
            return (
              <a
                key={pageNum}
                onClick={(e) => {
                  e.preventDefault();
                  setActivityPage(pageNum);
                }}
                className={activityPage === pageNum ? "active" : ""}
              >
                {pageNum}
              </a>
            );
          })}

          <a
            onClick={(e) => {
              e.preventDefault();
              setActivityPage((p) => p + 1);
            }}
          >
            &raquo;
          </a>
        </div>
      </div>
    </div>
  );
}
export default ActivityLog;
