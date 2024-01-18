import Background from "../components/Background/Background";
import HomeSignupButton from "../components/Buttons/Button";
import { HomeHeader } from "../components/Header/Header";
import Showcase from "../components/Showcase/Showcase";

function Home() {
  return (
    <>
      <Background />
      <div className="header-container">
        <HomeHeader />
        <HomeSignupButton text="Sign in" type="homeSignup" />
      </div>
      <Showcase />
    </>
  );
}

export default Home;
