import { Outlet, Navigate } from "react-router-dom";
import createTokenProvider from "../components/utils/tokens";
import { useToast } from "../components/utils/hooks";
import { Suspense } from "react";

export default function ProtectedRoutes() {
  const { isLoggedIn } = createTokenProvider();

  const showToast = useToast();

  if (!isLoggedIn()) {
    showToast.warning("You must log in to see this page");
  }

  return <Suspense>{isLoggedIn() ? <Outlet /> : <Navigate to="/" />}</Suspense>;
}
