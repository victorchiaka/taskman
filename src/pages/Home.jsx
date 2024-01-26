import Background from "../components/Background/Background";
import HomeSignupButton from "../components/Button/Button";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";
import Modal from "../components/Modal";
import Button from "../components/Button/Button";
import LoadingSpinner from "@assets/loading-spinner.svg";
import { useState } from "react";
import Input from "../components/Input";

import API_BASE from "../../config";

const BASE = API_BASE;

function Home() {
  const [active, setActive] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("register");

  const [loginEmail, setLoginEmail] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  if (!active && isLoginLoading) {
    setIsLoginLoading(false);
  }
  if (!active && isRegisterLoading) {
    setIsRegisterLoading(false);
  }

  const makeRegisterRequest = () => {
    const userData = {
      username,
      email,
      password,
    };
    registerRequest(userData)
      .then((res) => {
        console.log(res["tokens"]["access"]);
      })
      .catch((rej) => {
        console.log(rej);
      });
  };

  const registerRequest = (userData) => {
    const endpoint = `${BASE}/auth/register`;
    const request = new XMLHttpRequest();
    setIsRegisterLoading(true);
    return new Promise((resolve, reject) => {
      request.open("POST", endpoint, true);
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = () => {
        setIsRegisterLoading(false);
        request.readyState == 4 && request.status == 201
          ? console.log(resolve(JSON.parse(request.response)))
          : reject(Error(request.statusText));
      };
      request.onerror = (err) => reject(err);
      request.send(JSON.stringify(userData));
    });
  };

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
          <div className="auth-tab">
            <div className="auth-header">
              <p>Taskman authentication</p>
            </div>
            <div className="tab">
              <li
                className={`tab-label ${
                  activeTab === "register" ? "active" : ""
                }`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </li>
              <li
                className={`tab-label ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </li>
            </div>

            <div
              className={`tab-content ${
                activeTab === "register" ? "active" : ""
              }`}
            >
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <Input
                  name="username"
                  title="Username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  name="email"
                  title="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  name="password"
                  title="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="action-buttons-container">
                  <Button
                    type="cancel"
                    text="Cancel"
                    onClick={() => setActive(false)}
                  />
                  <Button
                    type="confirm"
                    text={
                      isRegisterLoading ? (
                        <img className="spinner" src={LoadingSpinner}></img>
                      ) : (
                        "Register"
                      )
                    }
                    onClick={makeRegisterRequest}
                  />
                </div>
              </form>
            </div>
            <div
              className={`tab-content ${activeTab === "login" ? "active" : ""}`}
            >
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                <Input
                  name="login-email"
                  title="Email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <Input
                  name="login-password"
                  title="Password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div className="action-buttons-container">
                  <Button
                    type="cancel"
                    text="Cancel"
                    onClick={() => setActive(false)}
                  />
                  <Button
                    type="confirm"
                    text={
                      isLoginLoading ? (
                        <img className="spinner" src={LoadingSpinner}></img>
                      ) : (
                        "Login"
                      )
                    }
                    onClick={() => setIsLoginLoading(true)}
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
      <Showcase />
    </>
  );
}

export default Home;
