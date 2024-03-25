import Modal from "./Modal";
import PropTypes from "prop-types";
import DeleteAccountForm from "../Form/DeleteAccountForm";
import { deleteAcccountRequest } from "../../services/api";
import { useToast } from "../utils/hooks";

const DeleteAccountModal = ({ showModal, setShowModal }) => {
  const showToast = useToast();

  const accessToken = localStorage.getItem("access_token");

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
