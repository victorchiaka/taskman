import Modal from "./Modal";
import CollectionForm from "../Form/CollectionForm";
import PropTypes from "prop-types";
import { useState } from "react";

const CreateCollectionModal = ({ props }) => {
  const { handleCreateCollection } = props;
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  const collectionFormProps = {
    preventDefaultAction: preventDefaultAction,
    edit: edit,
    setEdit: setEdit,
    setShowModal: setShowModal,
    handleCreateCollection: handleCreateCollection,
  };

  const modalProps = {
    showModal,
    setShowModal,
    isForm: true,
    children: <CollectionForm props={collectionFormProps} />,
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <span onClick={openModal} className="create-action">
        New Collection
      </span>
      <Modal {...modalProps} />
    </>
  );
};

CreateCollectionModal.propTypes = {
  props: PropTypes.object,
  handleCreateCollection: PropTypes.func,
};

export default CreateCollectionModal;
