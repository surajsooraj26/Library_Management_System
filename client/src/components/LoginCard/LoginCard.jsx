import "./LoginCard.css";
import { IoClose } from "react-icons/io5";
import api from "../../services/api";
import { useLogin } from "../../context/LoginContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function LoginCard({ onClose }) {
  const { setShowLogin } = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/login", form, { withCredentials: true });
      const res = await api.get("/user/me", { withCredentials: true });
      setUser(res.data);
      setShowLogin(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-card">
      <div className="login-card-header">
        <h2>Login</h2>
        <IoClose
          size={24}
          style={{ cursor: "pointer" }}
          onClick={onClose}
          className="icon-close"
        />{" "}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn bold border" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginCard;
