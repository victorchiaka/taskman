import { useState } from "react";
import styles from "./Collections.module.css";
import ThreeDotsNav from "@assets/three-dots-nav.svg";
import Options from "../../ui/Options";

import PropTypes from "prop-types";

const Collection = ({ collection, onClick }) => {
  const optionProps = {
    collection: collection,
    options: ["Edit", "Delete"],
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
    <div className={styles.collectionCard} onClick={handleCollectionClick}>
      <div>
        <div style={collectionColor}></div>
        <img
          onClick={(e) => {
            e.stopPropagation();
            setOpenOptions(!openOptions);
          }}
          src={ThreeDotsNav}
          className={styles.options}
        ></img>
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
};

export default Collection;
