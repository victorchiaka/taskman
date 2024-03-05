import Background from "../components/Background/Background";
import HomeSignupButton from "../components/Button/Button";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";
import Modal from "../components/Modal";
import { useState } from "react";
import AuthForm from "../components/Form/AuthForm";
import { useToast, useAuth } from "../components/utils/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./Pages.module.css";
import { registerRequest, loginRequest } from "../services/api";

/**
 * Renders the Home page component.
 *
 * @returns {React.ReactNode} - A React element that renders the Home page.
 */
function Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const showToast = useToast();

  const auth = useAuth();

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

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

  const authFormProps = {
    setActive: setActive,
    preventDefaultAction: preventDefaultAction,
    handleRegisterSubmit: handleRegisterSubmit,
    handleLoginSubmit: handleLoginSubmit,
  };

  return (
    <div className={styles.homeBody}>
      <Background />
      <div className="header-container">
        <HomeHeader />
        <HomeSignupButton
          text="Sign in"
          type="homeSignup"
          onClick={() => setActive(true)}
        />
        <Modal setIsActive={setActive} isActive={active} isForm={true}>
          <AuthForm props={authFormProps} />
        </Modal>
      </div>
      <Showcase />
    </div>
  );
}

export default Home;
