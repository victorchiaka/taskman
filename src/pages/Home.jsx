import Form from "../components/Form/Form";
import Background from "../components/Background/Background";
import HomeSignupButton from "../components/Button/Button";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";
import Modal from "../components/Modal";
import Button from "../components/Button/Button";
import Loading1 from "@assets/loading-1.svg";

import { useState } from "react";

function Home() {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loginTemplate = {
    title: "Login",
    type: "authentication",
    fields: [
      {
        title: "Username",
        type: "text", // type of form
        name: "username",
      },
      {
        title: "Email",
        type: "email", // type of form
        name: "email",
      },
    ],
  };

  const registerTemplate = {
    title: "Register",
    type: "authentication",
    fields: [
      {
        title: "Username",
        type: "text", // type of form
        name: "username",
      },
      {
        title: "Email",
        type: "email", // type of form
        name: "email",
      },
      {
        title: "Password",
        type: "password", // type of form
        name: "password",
      },
    ],
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
            <input
              type="radio"
              className="auth-tab-option"
              name="auth"
              id="register"
              checked
            />
            <label htmlFor="register" className="tab-label">
              Register
            </label>
            <div className="tab-content">
              <Form template={registerTemplate} />
              <div className="action-buttons-container">
                <Button
                  type="cancel"
                  text="Cancel"
                  onClick={() => setActive(false)}
                />
                <Button
                  type="confirm"
                  text={
                    isLoading ? (
                      <img className="spinner" src={Loading1}></img>
                    ) : (
                      "Register"
                    )
                  }
                />
              </div>
            </div>
            <input
              type="radio"
              className="auth-tab-option"
              name="auth"
              id="login"
            />
            <label htmlFor="login" className="tab-label">
              Login
            </label>
            <div className="tab-content">
              <Form template={loginTemplate} />
              <div className="action-buttons-container">
                <Button
                  type="cancel"
                  text="Cancel"
                  onClick={() => setActive(false)}
                />
                <Button
                  type="confirm"
                  text={
                    isLoading ? (
                      <img className="spinner" src={Loading1}></img>
                    ) : (
                      "Login"
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <Showcase />
    </>
  );
}

export default Home;
