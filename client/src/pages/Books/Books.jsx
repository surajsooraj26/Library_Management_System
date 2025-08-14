import { useAuth } from "../../context/AuthContext";
import AdminBooks from "./Admin/AdminBooks";
import MemberBooks from "./Member/MemberBooks";

function Books() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return user.role === "admin" ? <AdminBooks /> : <MemberBooks />;
}
export default Books;
