import Form from "../components/Form/Form";
import Background from "../components/Background/Background";
import HomeSignupButton from "../components/Button/Button";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";
import Modal from "../components/Modal";

function Home() {
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
    confirmText: "Login",
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
    confirmText: "Register",
  };

  return (
    <>
      <Background />
      <div className="header-container">
        <HomeHeader />
        <HomeSignupButton text="Sign in" type="homeSignup" />
        <Modal>
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
            </div>
          </div>
        </Modal>
      </div>
      <Showcase />
    </>
  );
}

export default Home;
