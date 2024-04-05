import Modal from "./Modal";
import PropTypes from "prop-types";
import DeleteAccountForm from "../Form/DeleteAccountForm";
import { deleteAcccountRequest } from "../../services/api";
import { useToast } from "../utils/hooks";
import createTokenProvider, { createAuthProvider } from "../utils/tokens";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({ showModal, setShowModal }) => {
  const showToast = useToast();
  const navigate = useNavigate();
  const { logout } = createAuthProvider();
  const { getToken } = createTokenProvider();

  const handleDeleteAccount = async (userData) => {
    let accessToken = await getToken().then((res) => res);

    deleteAcccountRequest(accessToken, userData)
      .then((res) => {
        showToast.success(res["message"]);
        logout();
        navigate("/");
      }).catch((rej) => {
        if (rej["message"] === "Invalid token") {
          showToast.info("Session expired, please log in again");
          logout();
        }
      });
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
