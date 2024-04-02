import { Outlet, Navigate } from "react-router-dom";
import createTokenProvider from "../components/utils/tokens";

export default function ProtectedRoutes() {
  const { isLoggedIn } = createTokenProvider();

  return isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
}
