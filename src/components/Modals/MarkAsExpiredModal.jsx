import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import PropTypes from "prop-types";

const MarkAsExpiredModal = ({
  showModal,
  setShowModal,
  handleMarkAsExpired,
}) => {
  const confirmDialogProps = {
    actionHeader: "Mark as Expired",
    actionDescription: "Have you cleared this paper?",
    actions: [
      {
        text: "Cancel",
        type: "cancel",
        onClick: () => setShowModal(false),
      },
      {
        text: "Confirm",
        type: "confirm",
        onClick: handleMarkAsExpired,
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

MarkAsExpiredModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleMarkAsExpired: PropTypes.func,
};

export default MarkAsExpiredModal;
