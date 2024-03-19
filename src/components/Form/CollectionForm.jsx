import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input";
import LoadingSpinner from "@assets/loading-spinner.svg";
import { useInput } from "../utils/hooks";
import PropTypes from "prop-types";

const CollectionForm = ({ props }) => {
  const {
    edit,
    setEdit,
    setShowModal,
    preventDefaultAction,
    handleCreateCollection,
    activeCollection = "",
    setActiveCollection = () => undefined,
    handleEditCollection,
  } = props;

  const [isCreationLoading, setIsCreationLoading] = useState(false);
  const [collectionColor, setCollectionColor] = useInput("#ffffff");
  const [collectionName, setCollectionName] = useInput("");
  const [newCollectionName, setNewCollectionName] = useInput("");

  const resetStates = () => {
    setCollectionColor("#fff");
    setCollectionName("");
    setNewCollectionName("");
    setActiveCollection("");
    setIsCreationLoading(false);
    setEdit(false);
    setShowModal(false);
  };

  const createCollection = () => {
    setIsCreationLoading(true);
    handleCreateCollection({
      collection_name: collectionName.value,
      color_code: collectionColor.value,
    });

    resetStates();
  };

  const editCollectionName = () => {
    handleEditCollection({
      collection_name: activeCollection,
      new_collection_name: newCollectionName.value,
    });
    resetStates();
  };

  return (
    <form
      className="form collection-form"
      onSubmit={(e) => preventDefaultAction(e)}
      onClick={(e) => e.stopPropagation()}
    >
      {edit ? (
        <>
          <div className="form-header">
            <p>Taskman - Edit Collection</p>
          </div>
          <Input
            required
            name="new-collection-name"
            title="New Collection Name"
            type="text"
            {...newCollectionName}
          />
        </>
      ) : (
        <>
          <div className="form-header">
            <p>Taskman Collection</p>
          </div>
          <Input
            required
            name="collection-color"
            title="Color"
            type="color"
            {...collectionColor}
          />
          <Input
            required
            name="collection-name"
            title="Collection Name"
            type="text"
            {...collectionName}
          />
        </>
      )}
      <div className="action-buttons-container">
        <Button
          type="cancel"
          text="Cancel"
          onClick={() => setShowModal(false)}
        />
        <Button
          onClick={edit ? editCollectionName : createCollection}
          type="confirm"
          text={
            isCreationLoading ? (
              <img className="spinner" src={LoadingSpinner}></img>
            ) : edit ? (
              "Edit"
            ) : (
              "Create"
            )
          }
        />
      </div>
    </form>
  );
};

CollectionForm.propTypes = {
  props: PropTypes.object,
  setShowModal: PropTypes.func,
  preventDefaultAction: PropTypes.func,
  handleCreateCollection: PropTypes.func,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  activeCollection: PropTypes.string,
  setActiveCollection: PropTypes.func,
  handleEditCollection: PropTypes.func,
};

export default CollectionForm;
