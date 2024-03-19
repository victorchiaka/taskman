// import { useModal } from "../utils/hooks";
import AuthForm from "../Form/AuthForm";
import HomeSignupButton from "../Button/Button";
import Modal from "./Modal";
import { useState } from "react";
import PropTypes from "prop-types";

const AuthFormModal = ({ props }) => {
  const { preventDefaultAction, handleRegisterSubmit, handleLoginSubmit } =
    props;

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const authFormProps = {
    preventDefaultAction: preventDefaultAction,
    handleRegisterSubmit: handleRegisterSubmit,
    handleLoginSubmit: handleLoginSubmit,
    setShowModal: setShowModal,
  };

  const modalProps = {
    showModal: showModal,
    setShowModal: setShowModal,
    isForm: true,
    children: <AuthForm props={authFormProps} />,
  };

  return (
    <>
      <HomeSignupButton text="Sign in" type="homeSignup" onClick={openModal} />
      <Modal {...modalProps} />
    </>
  );
};

AuthFormModal.propTypes = {
  props: PropTypes.object,
  preventDefaultAction: PropTypes.func,
  handleRegisterSubmit: PropTypes.func,
  handleLoginSubmit: PropTypes.func,
};

export default AuthFormModal;
