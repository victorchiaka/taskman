import PropTypes from "prop-types";
import { deleteCollectionRequest } from "../services/api";
import { useToast } from "../components/utils/hooks";

const Options = ({ props }) => {
  const {
    collection,
    options,
    setIsCollectionEdit,
    setCollectionFormActive,
    setActiveCollection,
  } = props;

  const showToast = useToast();

  const handleEditCollectionClick = () => {
    setIsCollectionEdit(true);
    setCollectionFormActive(true);
  };

  const handleDeleteCollection = (collectionName) => {
    const deleteActionConfirmationMessage =
      "Have you completed all the tasks in this collection?";
    if (window.confirm(deleteActionConfirmationMessage)) {
      const data = { collection_name: collectionName };
      deleteCollectionRequest(data)
        .then((res) => showToast.success(res["message"]))
        .catch((rej) => showToast.error(rej["message"]));
    }
    return;
  };

  const handleOptionClick = (index, e) => {
    e.stopPropagation();
    setActiveCollection(collection.collection_name);

    index == 1
      ? handleDeleteCollection(collection.collection_name)
      : handleEditCollectionClick();
  };

  return (
    <div className="options">
      {options.map((option, index) => {
        return (
          <p onClick={(e) => handleOptionClick(index, e)} key={index}>
            {option}
          </p>
        );
      })}
    </div>
  );
};

Options.propTypes = {
  props: PropTypes.object,
  collection: PropTypes.object,
  options: PropTypes.array,
  setIsCollectionEdit: PropTypes.func,
  setCollectionFormActive: PropTypes.func,
  setActiveCollection: PropTypes.func,
};

export default Options;
