import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
function Login() {
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
      navigate("/dashboard"); // or any protected route
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
export default Login;
