import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input";
import LoadingSpinner from "@assets/loading-spinner.svg";
import { useInput } from "../utils/hooks";
import PropTypes from "prop-types";

const CollectionForm = ({
  setActive,
  preventDefaultAction,
  handleCreateCollection,
}) => {
  const [isCreationLoading, setIsCreationLoading] = useState(false);
  const [collectionColor, setCollectionColor] = useInput("#ffffff");
  const [collectionName, setCollectionName] = useInput("");

  const resetStates = () => {
    setCollectionColor("#fff");
    setCollectionName("");
    setIsCreationLoading(false);
  };

  const createCollection = () => {
    setIsCreationLoading(true);
    handleCreateCollection({
      collection_name: collectionName.value,
      color_code: collectionColor.value,
    });

    resetStates();
    setActive(false);
  };

  return (
    <form
      className="form collection-form"
      onSubmit={(e) => preventDefaultAction(e)}
      onClick={(e) => e.stopPropagation()}
    >
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
      <div className="action-buttons-container">
        <Button type="cancel" text="Cancel" onClick={() => setActive(false)} />
        <Button
          onClick={createCollection}
          type="confirm"
          text={
            isCreationLoading ? (
              <img className="spinner" src={LoadingSpinner}></img>
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
  setActive: PropTypes.func,
  preventDefaultAction: PropTypes.func,
  handleCreateCollection: PropTypes.func,
};

export default CollectionForm;
