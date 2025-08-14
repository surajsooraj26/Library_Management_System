import React from "react";
import "./ActivityTable.css";
import { useState } from "react";

function ActivityTable() {
  const [activityPage, setActivityPage] = useState(1);
  const windowSize = 5;
  const start = Math.max(1, activityPage - windowSize + 1);

  const activities = [
    {
      user: "Ethan Walker",
      action: "Checked out 'The Silent Observer'",
      timestamp: "2024-07-26 10:30 AM",
    },
    {
      user: "Olivia Hayes",
      action: "Added new book 'Whispers in the Wind'",
      timestamp: "2024-07-25 03:45 PM",
    },
    {
      user: "Caleb Bennett",
      action: "Registered new account",
      timestamp: "2024-07-24 09:15 AM",
    },
    {
      user: "Ava Thorne",
      action: "Updated book details for 'Echoes of the Past'",
      timestamp: "2024-07-23 02:20 PM",
    },
    {
      user: "Liam Reed",
      action: "Checked out 'The Hidden Truth'",
      timestamp: "2024-07-22 11:00 AM",
    },
  ];

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="table">
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
                <td>{activity.user}</td>
                <td className="action">{activity.action}</td>
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
  );
}

export default ActivityTable;
