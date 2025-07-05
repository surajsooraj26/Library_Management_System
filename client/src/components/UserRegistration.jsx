import { useState } from "react";
import api from "../services/api";
function UserRegistration({ setReg }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const close = () => {
    setReg(false);
  };

  //Issue Book
  const addUser = async (event) => {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
      role: "member",
    };
    try {
      const add = await api.post("/user/register", data);
      setReg(false);
    } catch (err) {
      console.log({ message: "Unexpected Error" });
    }
  };

  return (
    <div className="assign-book">
      <h1>Add New User</h1>
      <form onSubmit={addUser} className="assign-book-form">
        <div className="row">
          <div className="form-group bookid">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group bookname">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email ID"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group auther">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
        </div>

        <div className="assign-button">
          <button onClick={close} className="close-btn" type="button">
            close
          </button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
export default UserRegistration;
