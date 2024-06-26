import Background from "../components/Background/Background";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";
import styles from "./Pages.module.css";
import AuthFormModal from "../components/Modals/AuthFormModal";
import { useNavigate } from "react-router-dom";
import { registerRequest, loginRequest } from "../services/api";
import { useToast } from "../components/utils/hooks";
import createTokenProvider, {
  createAuthProvider,
} from "../components/utils/tokens";
import GoToDashboard from "../ui/go-to-dashboard/GoToDashboard";

/**
 * Renders the Home page component.
 *
 * @returns {React.ReactNode} - A React element that renders the Home page.
 */
function Home() {
  const { login } = createAuthProvider();
  const { isLoggedIn } = createTokenProvider();

  const navigate = useNavigate();
  const showToast = useToast();

  function preventDefaultAction(e) {
    e.preventDefault();
  }

  const handleRegisterSubmit = async (userData) => {
    await registerRequest(userData)
      .then((res) => {
        login(res["tokens"]);
        showToast.success(res["message"]);
        navigate("/dashboard");
      })
      .catch((rej) => {
        showToast.error(rej["message"]);
      });
  };

  const handleLoginSubmit = async (userData) => {
    await loginRequest(userData)
      .then((res) => {
        login(res["tokens"]);
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
      {isLoggedIn() && <GoToDashboard />}
      <div className="header-container">
        <HomeHeader />
        <AuthFormModal props={authFormModalProps} />
      </div>
      <Showcase />
    </div>
  );
}

export default Home;
