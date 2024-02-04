import Background from "../components/Background/Background";
import HomeSignupButton from "../components/Button/Button";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";
import Modal from "../components/Modal";
import { useState } from "react";
import API_BASE from "../../config";
import AuthForm from "../components/Form/AuthForm";
import { useToast } from "../components/utils/hooks";

const BASE = API_BASE;

/**
 * Renders the Home page component.
 *
 * @returns {React.ReactNode} - A React element that renders the Home page.
 */
function Home() {
  const [active, setActive] = useState(false);
  const showToast = useToast();

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
        console.log(res);
        showToast.success(res["message"]);
      })
      .catch((rej) => {
        showToast.error(rej["message"]);
      });
  }

  const handleLoginSubmit = (userData) => {
    showToast.error("Test error");
    loginRequest(userData)
      .then((res) => {
        showToast.success(res["message"]);
      })
      .catch((rej) => {
        showToast.error(rej["message"]);
      });
  }

  return (
    <>
      <Background />
      <div className="header-container">
        <HomeHeader />
        <HomeSignupButton
          text="Sign in"
          type="homeSignup"
          onClick={() => setActive(true)}
        />
        <Modal isActive={active}>
          <AuthForm setActive={setActive}
            preventDefaultAction={preventDefaultAction}
            handleRegisterSubmit={handleRegisterSubmit}
            handleLoginSubmit={handleLoginSubmit}
          />
        </Modal>
      </div>
      <Showcase />
    </>
  );
}

export default Home;
