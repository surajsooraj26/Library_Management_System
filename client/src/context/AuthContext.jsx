// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import axios from "../services/api"; // your Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on mount (optional)
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("/user/me", { withCredentials: true }); // backend must return user data
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  const logout = async () => {
    await axios.post("/user/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
