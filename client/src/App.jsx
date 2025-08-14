import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { LogoutProvider } from "./context/LogoutContext.jsx";
import Books from "./pages/Books/Books.jsx";
import AdminUsers from "./pages/Users/AdminUsers.jsx";
import ActivityLog from "./pages/ActivityLog/ActivityLog.jsx";
import { CheckoutProvider } from "./context/CheckoutContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
function App() {
  return (
    <AuthProvider>
      <LoginProvider>
        <LogoutProvider>
          <Navbar />
        </LogoutProvider>
        <CheckoutProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <Books />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/activitylog"
              element={
                <ProtectedRoute>
                  <ActivityLog />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CheckoutProvider>
      </LoginProvider>
    </AuthProvider>
  );
}

export default App;
