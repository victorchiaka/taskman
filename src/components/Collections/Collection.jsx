import { useState } from "react";
import styles from "./Collections.module.css";
import ThreeDotsNav from "@assets/three-dots-nav.svg";
import Edit from "@assets/edit.svg";
import Delete from "@assets/delete.svg";
import PropTypes from "prop-types";

const CollectionOption = () => {
  return (
    <div className={styles.collectionOption}>
      <p>Edit <img src={Edit}></img></p>
      <p>Delete <img src={Delete}></img></p>
    </div>
  );
}

const Collection = ({ collection }) => {
  const [openCollectionOption, setOpenCollectionOption] = useState(false);

  return (
    <div className={styles.collectionCard}>
      <div>
        <div className={styles.collectionColor}></div>
        <img onClick={() => setOpenCollectionOption(!openCollectionOption)} src={ThreeDotsNav} className={styles.options}></img>
      </div>
      <div>
        <h3>{collection.collection_name}</h3>
        <small>{collection.created_at}</small>
      </div>
      {openCollectionOption && <CollectionOption />}
    </div>
  )
}

Collection.propTypes = {
  collection: PropTypes.object
}

export default Collection;