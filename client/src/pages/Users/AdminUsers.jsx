import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "./AdminUsers.css";
import { useAddUser } from "../../context/AddUserContext";
import AddUserForm from "../../components/AddUserForm/AddUserForm.jsx";

function AdminUsers() {
  const [userPage, setUserPage] = useState(1);
  const usersPerPage = 5;
  const { showAddUserForm, setShowAddUserForm } = useAddUser();
  // Sample user data
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user", { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // pagination calculations
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (userPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

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
                <th>SL No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{user.name}</td>
                  <td className="timestamp">{user.email}</td>
                  <td className="timestamp">{user.role}</td>
                  <td className="timestamp">
                    <a>View Details</a> | <a>Edit</a> | <a>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <a
            onClick={(e) => {
              e.preventDefault();
              setUserPage((p) => Math.max(1, p - 1));
            }}
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
              setUserPage((p) => Math.min(totalPages, p + 1));
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
