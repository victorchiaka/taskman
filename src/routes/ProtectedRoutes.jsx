import { Outlet, Navigate } from "react-router-dom";

/**
 * NOTE: this small clause is just to simulate authentication and authorization
 */
const auth = { token: false };

export default function ProtectedRoutes() {
  return auth.token ? <Outlet /> : <Navigate to="/" />;
}
