import "./Navbar.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
function Navbar() {
  const { user, setUser } = useAuth();
  const login = () => {
    window.location.href = "/login";
  };
  const Logout = async () => {
    try {
      await api.post("/user/logout", {}, { withCredentials: true });
      setUser(null); // clear the logged-in user
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className="nav-bar">
      <div className="left">
        <img src="/logo.png" alt="logo" />
        <img src="/title.png" className="title" alt="title" />
      </div>
      {isHomePage && (
        <div className="right">
          <SearchInput />

          <button onClick={login}>Login</button>
        </div>
      )}
      {!isHomePage && user && user.role === "admin" && (
        <div className="right">
          <a href="/dashboard">Dashboard</a>
          <a href="/books">Books</a>
          <a href="/users">Users</a>
          <a href="/report">Report</a>
          <button onClick={Logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
export default Navbar;
