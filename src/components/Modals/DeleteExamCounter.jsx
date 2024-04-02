import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import PropTypes from "prop-types";

const DeleteExamCounterModal = ({ showModal, setShowModal, handleDeleteExamCounter }) => {

  const confirmDialogProps = {
    actionHeader: "Delete Exam",
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
        onClick: handleDeleteExamCounter,
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

DeleteExamCounterModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleDeleteExamCounter: PropTypes.func,
};

export default DeleteExamCounterModal;
