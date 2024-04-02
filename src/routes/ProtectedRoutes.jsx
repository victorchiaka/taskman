import { Outlet, Navigate } from "react-router-dom";
import createTokenProvider from "../components/utils/tokens";
import { useToast } from "../components/utils/hooks";

export default function ProtectedRoutes() {
  const { isLoggedIn } = createTokenProvider();

  const showToast = useToast();

  if (!isLoggedIn()) {
    showToast.warning("You must log in to see this page");
  }

  return isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
}
