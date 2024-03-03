import PropTypes from "prop-types";
import { deleteCollectionRequest } from "../services/api";
import { useToast } from "../components/utils/hooks";

const Options = ({ props }) => {
  const { collection, options } = props;

  const showToast = useToast();

  const handleDeleteCollection = (collectionName) => {
    const data = { collection_name: collectionName };
    deleteCollectionRequest(data)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const handleOptionClick = (index, e) => {
    e.stopPropagation();

    if (index == 1) {
      handleDeleteCollection(collection.collection_name);
    }
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
};

export default Options;
