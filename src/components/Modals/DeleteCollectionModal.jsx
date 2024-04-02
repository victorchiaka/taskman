import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import PropTypes from "prop-types";

const DeleteCollectionModal = ({ showModal, setShowModal, handleDeleteCollection }) => {

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
        onClick: handleDeleteCollection,
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

DeleteCollectionModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleDeleteCollection: PropTypes.func,
};

export default DeleteCollectionModal;
