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
 * @param {Function} setShowModal - A callback function passed down from the parent component to indicate the active state of the parent component.
 * @param {Function} handleRegisterSubmit - A callback function to handle the registration form submission.
 * @param {Function} handleLoginSubmit - A callback function to handle the login form submission.
 * @returns {React.ReactNode} - A React element that renders the Authentication form.
 */
const AuthForm = ({ props }) => {
  const {
    preventDefaultAction,
    handleRegisterSubmit,
    handleLoginSubmit,
    setShowModal,
  } = props;

  const [username, setUsername] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [loginEmail, setLoginEmail] = useInput("");
  const [loginPassword, setLoginPassword] = useInput("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [activeTab, setShowModalTab] = useState("register");

  const resetStates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setLoginEmail("");
    setLoginPassword("");
    setLoginLoading(false);
    setRegisterLoading(false);
  };

  const registerSubmit = async (e) => {
    preventDefaultAction(e);
    setRegisterLoading(true);
    await handleRegisterSubmit({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    resetStates();
  };

  const loginSubmit = async (e) => {
    preventDefaultAction(e);
    setLoginLoading(true);
    await handleLoginSubmit({
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
          onClick={() => setShowModalTab("register")}
        >
          Register
        </li>
        <li
          className={`tab-label ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setShowModalTab("login")}
        >
          Login
        </li>
      </div>
      <div
        className={`tab-content ${activeTab === "register" ? "active" : ""}`}
      >
        <form className="form" onSubmit={registerSubmit}>
          <Input
            name="username"
            title="Username"
            type="text"
            required
            {...username}
          />
          <Input name="email" title="Email" type="email" required {...email} />
          <Input
            name="password"
            title="Password"
            type="password"
            required
            {...password}
          />
          <div className="action-buttons-container">
            <Button
              type="cancel"
              text="Cancel"
              onClick={() => setShowModal(false)}
            />
            <Button
              type="submit confirm"
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
        <form className="form" onSubmit={loginSubmit}>
          <Input
            name="login-email"
            title="Email"
            type="email"
            required
            {...loginEmail}
          />
          <Input
            name="login-password"
            title="Password"
            type="password"
            required
            {...loginPassword}
          />
          <div className="action-buttons-container">
            <Button
              type="cancel"
              text="Cancel"
              onClick={() => setShowModal(false)}
            />
            <Button
              type="confirm submit"
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
  setShowModal: PropTypes.func,
  handleRegisterSubmit: PropTypes.func,
  handleLoginSubmit: PropTypes.func,
};

export default AuthForm;
