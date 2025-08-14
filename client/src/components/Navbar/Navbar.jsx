import "./Navbar.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import LoginCard from "../LoginCard/LoginCard.jsx";
import { useLogin } from "../../context/LoginContext.jsx";
import LogOut from "../LogOut/LogOut.jsx";
import { useLogout } from "../../context/LogoutContext.jsx";
function Navbar() {
  const { showLogin, setShowLogin } = useLogin();
  const { showLogout, setShowLogout } = useLogout();
  const { user, setUser } = useAuth();
  const loginform = () => {
    setShowLogin(true);
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
    <div className="parent-nav">
      <div className={showLogin ? "nav-bar dimmed" : "nav-bar"}>
        <div className="left">
          <img src="/logo.png" alt="logo" />
          <img
            src="/title.png"
            className="title"
            alt="title"
            onClick={() =>
              user == null
                ? (window.location.href = "/")
                : (window.location.href = "/dashboard")
            }
          />
        </div>
        {isHomePage && (
          <div className="right">
            <form action="">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input home"
                />
              </div>
            </form>

            <button className="btn bold" onClick={loginform}>
              Login
            </button>
          </div>
        )}
        {!isHomePage && user && user.role === "admin" && (
          <div className="right">
            <a href="/dashboard">Dashboard</a>
            <a href="/books">Books</a>
            <a href="/users">Users</a>
            <a href="/activitylog">Activity Logs</a>
            <a href="/settings">Settings</a>
            <button className="btn bold" onClick={() => setShowLogout(true)}>
              Logout
            </button>
          </div>
        )}
      </div>
      {showLogin && <LoginCard onClose={() => setShowLogin(false)} />}
      {showLogout && <LogOut onClose={() => setShowLogout(false)} />}
    </div>
  );
}
export default Navbar;
