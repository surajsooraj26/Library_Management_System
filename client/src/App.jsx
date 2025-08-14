import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";
import { LogoutProvider } from "./context/LogoutContext.jsx";
import Books from "./pages/Books/Books.jsx";

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
        </Routes>
      </LoginProvider>
    </AuthProvider>
  );
}

export default App;
