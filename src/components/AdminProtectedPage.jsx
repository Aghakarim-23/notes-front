import Loading from "./Loading.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
const AdminProtectedPage = ({ children }) => {
  const { user, loading , token} = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") return <Navigate to="/forbidden" replace />;

  console.log(user.role)

  return children;
};

export default AdminProtectedPage;
