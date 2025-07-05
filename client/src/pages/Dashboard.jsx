import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import MemberDashboard from "./MemberDashboard";

function Dashboard() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return user.role === "admin" ? <AdminDashboard /> : <MemberDashboard />;
}

export default Dashboard;
