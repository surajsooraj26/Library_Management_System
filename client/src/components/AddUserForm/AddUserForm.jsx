import { IoClose } from "react-icons/io5";
import { useAddUser } from "../../context/AddUserContext";
import api from "../../services/api";
import "./AddUserForm.css";
function AddUserForm() {
  const { setShowAddUserForm } = useAddUser();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    api
      .post("/user/register", userData, { withCredentials: true })
      .then((response) => {
        console.log("User added:", response.data);
        setShowAddUserForm(false);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div className="add-form">
      <div className="head">
        <h2>Add User</h2>
        <IoClose
          onClick={() => setShowAddUserForm(false)}
          className="close-icon"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="adduser">
          <div className="adduser-1">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                cols="30"
                rows="10"
                id="address"
                name="address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="profile">Profile Picture</label>
              <input type="file" id="profile" name="profilePicture" />
            </div>
          </div>
          <div className="adduser-2">
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" name="dob" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="blood">Blood Group</label>
              <input type="text" id="blood" name="blood" required />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select name="role" id="role">
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn submit-btn">
              Add User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
