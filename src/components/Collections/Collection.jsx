import { useState } from "react";
import ThreeDotsNav from "@assets/three-dots-nav.svg";
import deleteIcon from "@assets/delete.svg";
import editIcon from "@assets/edit.svg";
import Options from "../../ui/Options";
import { deleteCollectionRequest } from "../../services/api";
import { useToast } from "../utils/hooks";

import PropTypes from "prop-types";

const Collection = ({
  collection,
  onClick,
  setIsCollectionEdit,
  setCollectionFormActive,
  setActiveCollection,
}) => {
  const showToast = useToast();

  const jwtToken = localStorage.getItem("access_token");

  const handleDeleteCollection = () => {
    const confirmDeleteMessage =
      "Have you completed all the tasks in this collection";
    if (confirm(confirmDeleteMessage)) {
      deleteCollectionRequest(jwtToken, {
        collection_name: collection.collection_name,
      })
        .then((res) => showToast.success(res["message"]))
        .catch((rej) => showToast.error(rej["message"]));
    }
    return;
  };

  const handleEditCollection = () => {
    setIsCollectionEdit(true);
    setCollectionFormActive(true);
    setActiveCollection(collection.collection_name);
  };

  const optionProps = {
    options: [
      {
        optionName: "Edit",
        onClick: handleEditCollection,
        icon: editIcon,
      },
      {
        optionName: "Delete",
        onClick: handleDeleteCollection,
        icon: deleteIcon,
      },
    ],
  };

  const [openOptions, setOpenOptions] = useState(false);

  const handleCollectionClick = () => {
    onClick(collection);
  };

  const collectionColor = {
    backgroundColor: collection.color_code,
    width: " 2rem",
    height: "2rem",
    borderRadius: "50%",
  };

  return (
    <div className="collection-card" onClick={handleCollectionClick}>
      <div>
        <div style={collectionColor}></div>
        <img
          onClick={(e) => {
            e.stopPropagation();
            setOpenOptions(!openOptions);
          }}
          src={ThreeDotsNav}
        />
      </div>
      <div>
        <h3>{collection.collection_name}</h3>
        <small>{collection.created_at}</small>
      </div>
      {openOptions && <Options props={optionProps} />}
    </div>
  );
};

Collection.propTypes = {
  onClick: PropTypes.func,
  collection: PropTypes.object,
  setIsCollectionEdit: PropTypes.func,
  setCollectionFormActive: PropTypes.func,
  setActiveCollection: PropTypes.func,
};

export default Collection;
