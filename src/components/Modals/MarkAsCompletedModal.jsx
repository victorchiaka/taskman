import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import PropTypes from "prop-types";

const MarkAsCompletedModal = ({
  showModal,
  setShowModal,
  handleMarkTaskAsCompleted,
}) => {
  const confirmDialogProps = {
    actionHeader: "Mark as completed",
    actionDescription: "Have you accomplished this task?",
    actions: [
      {
        text: "Cancel",
        type: "cancel",
        onClick: () => setShowModal(false),
      },
      {
        text: "Confirm",
        type: "confirm",
        onClick: handleMarkTaskAsCompleted,
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

MarkAsCompletedModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleMarkTaskAsCompleted: PropTypes.func,
};

export default MarkAsCompletedModal;
