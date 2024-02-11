import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../components/utils/hooks";

export default function ProtectedRoutes() {

  const { authUser, isAuthenticated } = useAuth();

  console.log("Is Authenticate: ", isAuthenticated);
  console.log("Authenticated user: ", authUser);

  return isAuthenticated == true ? <Outlet /> : <Navigate to="/" />;
}
