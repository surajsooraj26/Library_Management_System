import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { LogoutProvider } from "./context/LogoutContext.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
function App() {
  return (
    <AuthProvider>
      <LoginProvider>
        <LogoutProvider>
          <Navbar />
        </LogoutProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LoginProvider>
    </AuthProvider>
  );
}

export default App;
