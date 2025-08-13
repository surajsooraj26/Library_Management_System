import React from "react";
import "./ActivityTable.css";
import { useState } from "react";

function ActivityTable() {
  const [activityPage, setActivityPage] = useState(1);
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
    <div className="activity-table-container">
      <div className="activity-table-wrapper">
        <table className="activity-table">
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
      <div class="pagination">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (activityPage > 1) setActivityPage(activityPage - 1);
          }}
        >
          &laquo;
        </a>
        {[...Array(5)].map((_, i) => {
          const pageNum = activityPage + i; // start from activityPage
          return (
            <a
              href="#"
              key={i}
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
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActivityPage(activityPage + 1);
          }}
        >
          &raquo;
        </a>
      </div>
    </div>
  );
}

export default ActivityTable;
