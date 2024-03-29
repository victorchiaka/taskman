import Modal from "./Modal";
import PropTypes from "prop-types";
import DeleteAccountForm from "../Form/DeleteAccountForm";
import {
  deleteAcccountRequest,
  refreshAccessTokenRequest,
} from "../../services/api";
import { useToast, useAuth } from "../utils/hooks";
import { isTokenExpired } from "../utils/tokens";

const DeleteAccountModal = ({ showModal, setShowModal }) => {
  const showToast = useToast();
  const auth = useAuth();

  let accessToken = localStorage.getItem("access_token");

  if (isTokenExpired(localStorage.getItem("access_token"))) {
    refreshAccessTokenRequest({
      refresh_token: localStorage.getItem("refresh_token"),
    }).then((res) => auth.login(res["tokens"]));
    accessToken = localStorage.getItem("access_token");
  }

  const handleDeleteAccount = (userData) => {
    deleteAcccountRequest(accessToken, userData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const modalProps = {
    isForm: true,
    showModal,
    setShowModal,
    children: (
      <DeleteAccountForm
        setShowModal={setShowModal}
        handleDeleteAccount={handleDeleteAccount}
      />
    ),
  };
  return (
    <>
      <Modal {...modalProps} />
    </>
  );
};

DeleteAccountModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default DeleteAccountModal;
