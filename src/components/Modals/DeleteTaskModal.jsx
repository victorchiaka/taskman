import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import PropTypes from "prop-types";

const DeleteTaskModal = ({ showModal, setShowModal, handleDeleteTask }) => {
  const confirmDialogProps = {
    actionHeader: "Delete Collection",
    actionDescription: "This action can't be undone",
    actions: [
      {
        text: "Cancel",
        type: "cancel",
        onClick: () => setShowModal(false),
      },
      {
        text: "Delete",
        type: "delete",
        onClick: handleDeleteTask,
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

DeleteTaskModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleDeleteTask: PropTypes.func,
};

export default DeleteTaskModal;
