import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../services/api";
import { useLogout } from "../../context/LogoutContext.jsx";
import "./LogOut.css";
function LogOut({ onClose }) {
  const { setUser } = useAuth();
  const { setShowLogout } = useLogout();
  const Logout = async () => {
    try {
      await api.post("/user/logout", {}, { withCredentials: true });
      setUser(null); // clear the logged-in user
      setShowLogout(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="logout-container">
      <h2>Are you sure you want to log out?</h2>
      <button className="btn border" onClick={Logout}>
        Yes, Log Out
      </button>
      <button className="btn border cancel-button" onClick={onClose}>
        No, Go Back
      </button>
    </div>
  );
}
export default LogOut;
