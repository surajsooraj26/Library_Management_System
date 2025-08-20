import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import "./AdminUsers.css";
import { useAddUser } from "../../context/AddUserContext";
import AddUserForm from "../../components/AddUserForm/AddUserForm.jsx";
function AdminUsers() {
  const [userPage, setUserPage] = useState(1);
  const windowSize = 5;
  const start = Math.max(1, userPage - windowSize + 1);
  const { showAddUserForm, setShowAddUserForm } = useAddUser();

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Member",
    },
    {
      name: "Caleb Bennett",
      email: "caleb@example.com",
      role: "Member",
    },
    {
      name: "Ava Thorne",
      email: "ava@example.com",
      role: "Member",
    },
    {
      name: "Ethan Walker",
      email: "ethan@example.com",
      role: "Member",
    },
  ];

  return (
    <div className="desktop-container">
      {showAddUserForm && <AddUserForm />}
      <div className="head">
        <h2>Users</h2>
        <button className="btn" onClick={() => setShowAddUserForm(true)}>
          Add User
        </button>
      </div>
      <form action="">
        <div className="search-box books">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Users"
            className="search-input books-input"
          />
        </div>
      </form>
      <div className="table-container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="">{user.name}</td>
                  <td className="timestamp">{user.email}</td>
                  <td className="timestamp">{user.role}</td>
                  <td className="timestamp">
                    <a>View Details</a>|<a>Edit</a>|<a>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <a
            onClick={(e) => {
              e.preventDefault();
              setBookPage((p) => Math.max(1, p - 1));
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
                  setUserPage(pageNum);
                }}
                className={userPage === pageNum ? "active" : ""}
              >
                {pageNum}
              </a>
            );
          })}

          <a
            onClick={(e) => {
              e.preventDefault();
              setBookPage((p) => p + 1);
            }}
          >
            &raquo;
          </a>
        </div>
      </div>
    </div>
  );
}
export default AdminUsers;
