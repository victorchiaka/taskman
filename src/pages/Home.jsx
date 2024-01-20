import Form from "../components/Form/Form";
import Background from "../components/Background/Background";
import HomeSignupButton from "../components/Button/Button";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";

function Home() {
  const template = {
    title: "Sign up",
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

  return (
    <>
      <Background />
      <div className="header-container">
        <HomeHeader />
        <HomeSignupButton text="Sign in" type="homeSignup" />
        <Form template={template} />
      </div>
      <Showcase />
    </>
  );
}

export default Home;
