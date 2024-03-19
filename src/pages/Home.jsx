import Background from "../components/Background/Background";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";
import styles from "./Pages.module.css";
import AuthFormModal from "../components/Modals/AuthFormModal";
import { useNavigate } from "react-router-dom";
import { registerRequest, loginRequest } from "../services/api";
import { useToast, useAuth } from "../components/utils/hooks";

/**
 * Renders the Home page component.
 *
 * @returns {React.ReactNode} - A React element that renders the Home page.
 */
function Home() {
  const navigate = useNavigate();
  const showToast = useToast();

  const auth = useAuth();

  function preventDefaultAction(e) {
    e.preventDefault();
  }

  const handleRegisterSubmit = (userData) => {
    registerRequest(userData)
      .then((res) => {
        auth.login(res["tokens"]);
        showToast.success(res["message"]);
        navigate("/dashboard");
      })
      .catch((rej) => {
        showToast.error(rej["message"]);
      });
  };

  const handleLoginSubmit = (userData) => {
    loginRequest(userData)
      .then((res) => {
        auth.login(res["tokens"]);
        showToast.success(res["message"]);
        navigate("/dashboard");
      })
      .catch((rej) => {
        showToast.error(rej["message"]);
      });
  };

  const authFormModalProps = {
    preventDefaultAction: preventDefaultAction,
    handleRegisterSubmit: handleRegisterSubmit,
    handleLoginSubmit: handleLoginSubmit,
  };

  return (
    <div className={styles.homeBody}>
      <Background />
      <div className="header-container">
        <HomeHeader />
        <AuthFormModal props={authFormModalProps} />
      </div>
      <Showcase />
    </div>
  );
}

export default Home;
