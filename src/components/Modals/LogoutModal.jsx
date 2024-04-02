import PropTypes from "prop-types";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import { useToast } from "../utils/hooks";
import { createAuthProvider } from "../utils/tokens";

const LogoutModal = ({ showModal, setShowModal }) => {
  const { logout } = createAuthProvider();

  const showToast = useToast();

  const handleLogout = () => {
    logout();
    showToast.success("Successfully logged out");
    window.location.reload();
  };

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
        text: "Confirm",
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
