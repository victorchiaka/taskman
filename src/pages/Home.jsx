import Background from "../components/Background/Background";
import HomeSignupButton from "../components/Button/Button";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";
import Modal from "../components/Modal";
import { useState } from "react";
import API_BASE from "../../config";
import AuthForm from "../components/Form/AuthForm";
import { useToast, useAuth } from "../components/utils/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./Pages.module.css";

const BASE = API_BASE;

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

  const registerRequest = (userData) => {
    const request = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      request.open("POST", `${BASE}/auth/register`, true);
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = () => {
        request.readyState == 4 && request.status == 201
          ? console.log(resolve(JSON.parse(request.response)))
          : reject(JSON.parse(request.response));
      };
      request.onerror = (err) => reject(err);
      request.send(JSON.stringify(userData));
    });
  };

  const loginRequest = (userData) => {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      request.open("POST", `${BASE}/auth/login`, true);
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = () => {
        request.readyState == 4 && request.status == 200
          ? console.log(resolve(JSON.parse(request.response)))
          : reject(JSON.parse(request.response));
      };
      request.onerror = (err) => reject(err);
      request.send(JSON.stringify(userData));
    });
  };

  const preventDefaultAction = e => {
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
  }

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
  }

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
        <Modal isActive={active} isForm={true}>
          <AuthForm setActive={setActive}
            preventDefaultAction={preventDefaultAction}
            handleRegisterSubmit={handleRegisterSubmit}
            handleLoginSubmit={handleLoginSubmit}
          />
        </Modal>
      </div>
      <Showcase />
    </div>
  );
}

export default Home;
