import React, { useState, useEffect } from "react";
import "./ActivityTable.css";
import api from "../../services/api";

function ActivityTable() {
  const [activities, setActivities] = useState([]);
  const [activityPage, setActivityPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch activities when page changes
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await api.get(`/activities?page=${activityPage}`);
        const data = res.data; // Axios automatically parses JSON

        console.log("Fetched activities:", res);

        setActivities(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities();
  }, [activityPage]);

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Book</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No activities found
                </td>
              </tr>
            ) : (
              activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.user?.name || "Unknown User"}</td>
                  <td className="action">
                    {activity.type === "issued"
                      ? `Issued ${activity.book?.title || "a book"}`
                      : `Returned ${activity.book?.title || "a book"}`}
                  </td>
                  <td>{activity.book?.title || "-"}</td>
                  <td className="timestamp">
                    {new Date(activity.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <a
          onClick={(e) => {
            e.preventDefault();
            setActivityPage((p) => Math.max(1, p - 1));
          }}
          className={activityPage === 1 ? "disabled" : ""}
        >
          &laquo;
        </a>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
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
            setActivityPage((p) => Math.min(totalPages, p + 1));
          }}
          className={activityPage === totalPages ? "disabled" : ""}
        >
          &raquo;
        </a>
      </div>
    </div>
  );
}

export default ActivityTable;
