import Modal from "./Modal";
import CollectionForm from "../Form/CollectionForm";
import PropTypes from "prop-types";

const EditCollectionModal = ({ props }) => {
  const {
    edit,
    setEdit,
    activeCollection,
    setActiveCollection,
    handleEditCollection,
    showModal,
    setShowModal,
  } = props;

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  const collectionFormProps = {
    preventDefaultAction: preventDefaultAction,
    edit: edit,
    setEdit: setEdit,
    setShowModal: setShowModal,
    activeCollection: activeCollection,
    setActiveCollection: setActiveCollection,
    handleEditCollection: handleEditCollection,
  };

  const modalProps = {
    showModal,
    setShowModal,
    isForm: true,
    children: <CollectionForm props={collectionFormProps} />,
  };

  return (
    <>
      <Modal {...modalProps} />
    </>
  );
};

EditCollectionModal.propTypes = {
  props: PropTypes.object,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  activeCollection: PropTypes.string,
  setActiveCollection: PropTypes.func,
  handleEditCollection: PropTypes.func,
};

export default EditCollectionModal;
