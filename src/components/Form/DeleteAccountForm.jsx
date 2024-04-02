import React from "react";
import PropTypes from "prop-types";
import { useInput } from "../utils/hooks";
import Input from "../Input";
import Button from "../Button/Button";
import LoadingSpinner from "@assets/loading-spinner.svg";

const DeleteAccountForm = ({ setShowModal, handleDeleteAccount }) => {
  const [email, setEmail] = useInput("");
  const [loading, setLoading] = React.useState(false);

  const resetStates = () => {
    setEmail("");
    setLoading(false);
  };

  const deleteAccount = () => {
    handleDeleteAccount({
      email: email.value,
    });
    resetStates();
  };

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="form collection-form"
      onSubmit={(e) => preventDefaultAction(e)}
      onClick={(e) => e.stopPropagation()}
    >
      <>
        <div className="auth-header">
          <p>Confirm your email 🤦‍♂️</p>
        </div>
        <Input required name="email" title="Email" type="email" {...email} />

        <div className="action-buttons-container">
          <Button
            type="cancel"
            text="Cancel"
            onClick={() => setShowModal(false)}
          />
          <Button
            onClick={deleteAccount}
            type="delete"
            text={
              loading ? (
                <img className="spinner" src={LoadingSpinner}></img>
              ) : (
                "Delete"
              )
            }
          />
        </div>
      </>
    </form>
  );
};

DeleteAccountForm.propTypes = {
  setShowModal: PropTypes.func,
  handleDeleteAccount: PropTypes.func,
};

export default DeleteAccountForm;
