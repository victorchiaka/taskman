import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { ToastProvider } from "./ui/toast/ToastProvider";
import Home from "./pages/Home";
import AuthProvider from "./components/auth/AuthProvider";
import { lazy } from "react";
import ExamCountersPage from "./pages/ExamCountersPage";
import StatisticsPage from "./pages/StatisticsPage";

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
              <Route path="/exam-counters" element={<ExamCountersPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
