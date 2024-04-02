import PropTypes from "prop-types";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import { useToast } from "../utils/hooks";

const LogoutModal = ({ showModal, setShowModal }) => {
  const showToast = useToast();

  const handleLogout = () => {};

  const confirmDialogProps = {
    actionHeader: "Logout",
    actionDescription: "Are you sure about this?",
    actions: [
      {
        text: "Cancel",
        type: "cancel",
        onClick: () => setShowModal(false),
      },
      {
        text: "Yes",
        type: "confirm",
        onClick: handleLogout,
      },
    ],
  };

  const modalProps = {
    isForm: true,
    showModal,
    setShowModal,
    children: <ConfirmDialog props={confirmDialogProps} />,
  };
  return (
    <>
      <Modal {...modalProps} />
    </>
  );
};

LogoutModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default LogoutModal;
