import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { ToastProvider } from "./ui/toast/ToastProvider";
import Home from "./pages/Home";
import AuthProvider from "./components/auth/AuthProvider";
import { lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
