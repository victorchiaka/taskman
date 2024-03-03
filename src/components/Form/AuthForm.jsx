import { useState } from "react";
import { useInput } from "../utils/hooks";
import Input from "../Input";
import Button from "../Button/Button";
import LoadingSpinner from "@assets/loading-spinner.svg";
import PropTypes from "prop-types";

/**
 * Renders an Authentication form component.
 *
 * @param {Function} preventDefaultAction - A callback function to prevent the default form submission behavior.
 * @param {Function} setActive - A callback function passed down from the parent component to indicate the active state of the parent component.
 * @param {Function} handleRegisterSubmit - A callback function to handle the registration form submission.
 * @param {Function} handleLoginSubmit - A callback function to handle the login form submission.
 * @returns {React.ReactNode} - A React element that renders the Authentication form.
 */
const AuthForm = ({ props }) => {
  const {
    preventDefaultAction,
    setActive,
    handleRegisterSubmit,
    handleLoginSubmit,
  } = props;

  const [username, setUsername] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [loginEmail, setLoginEmail] = useInput("");
  const [loginPassword, setLoginPassword] = useInput("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("register");

  const resetStates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setLoginEmail("");
    setLoginPassword("");
    setLoginLoading(false);
    setRegisterLoading(false);
  };

  const registerSubmit = () => {
    setRegisterLoading(true);
    handleRegisterSubmit({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    resetStates();
  };

  const loginSubmit = () => {
    setLoginLoading(true);
    handleLoginSubmit({
      email: loginEmail.value,
      password: loginPassword.value,
    });
    resetStates();
  };

  return (
    <div className="auth-tab" onClick={(e) => e.stopPropagation()}>
      <div className="auth-header">
        <p>Taskman authentication</p>
      </div>
      <div className="tab">
        <li
          className={`tab-label ${activeTab === "register" ? "active" : ""}`}
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
        className={`tab-content ${activeTab === "register" ? "active" : ""}`}
      >
        <form className="form" onSubmit={(e) => preventDefaultAction(e)}>
          <Input
            required
            name="username"
            title="Username"
            type="text"
            {...username}
          />
          <Input required name="email" title="Email" type="email" {...email} />
          <Input
            required
            name="password"
            title="Password"
            type="password"
            {...password}
          />
          <div className="action-buttons-container">
            <Button
              type="cancel"
              text="Cancel"
              onClick={() => setActive(false)}
            />
            <Button
              onClick={registerSubmit}
              type="confirm"
              text={
                registerLoading ? (
                  <img className="spinner" src={LoadingSpinner}></img>
                ) : (
                  "Register"
                )
              }
            />
          </div>
        </form>
      </div>
      <div className={`tab-content ${activeTab === "login" ? "active" : ""}`}>
        <form className="form" onSubmit={(e) => preventDefaultAction(e)}>
          <Input
            required
            name="login-email"
            title="Email"
            type="email"
            {...loginEmail}
          />
          <Input
            required
            name="login-password"
            title="Password"
            type="password"
            {...loginPassword}
          />
          <div className="action-buttons-container">
            <Button
              type="cancel"
              text="Cancel"
              onClick={() => setActive(false)}
            />
            <Button
              onClick={loginSubmit}
              type="confirm"
              text={
                loginLoading ? (
                  <img className="spinner" src={LoadingSpinner}></img>
                ) : (
                  "login"
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  props: PropTypes.object,
  preventDefaultAction: PropTypes.func,
  setActive: PropTypes.func,
  handleRegisterSubmit: PropTypes.func,
  handleLoginSubmit: PropTypes.func,
};

export default AuthForm;
