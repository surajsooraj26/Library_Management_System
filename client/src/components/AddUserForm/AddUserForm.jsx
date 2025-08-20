import { IoClose } from "react-icons/io5";
import { useAddUser } from "../../context/AddUserContext";
function AddUserForm() {
  const { setShowAddUserForm } = useAddUser();
  return (
    <div className="add-form">
      <div className="head">
        <h2>Add User</h2>
        <IoClose
          onClick={() => setShowAddUserForm(false)}
          className="close-icon"
        />
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select name="role" id="role">
            <option value="admin">Admin</option>
            <option value="librarian">Librarian</option>
            <option value="member">Member</option>
          </select>
        </div>
        <button type="submit" className="btn submit-btn">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
