import { useState } from "react";
import styles from "./Collections.module.css";
import ThreeDotsNav from "@assets/three-dots-nav.svg";
import Edit from "@assets/edit.svg";
import Delete from "@assets/delete.svg";

const CollectionOption = () => {
  return (
    <div className={styles.collectionOption}>
      <p>Edit <img src={Edit}></img></p>
      <p>Delete <img src={Delete}></img></p>
    </div>
  );
}

const Collection = () => {
  const [openCollectionOption, setOpenCollectionOption] = useState(false);

  return (
    <div className={styles.collectionCard}>
      <div>
        <div className={styles.collectionColor}></div>
        <img onClick={() => setOpenCollectionOption(!openCollectionOption)} src={ThreeDotsNav} className={styles.options}></img>
      </div>
      <div>
        <h3>Goal</h3>
        <small>Thurs: 11 Jan 2024</small>
      </div>
      
      {openCollectionOption && <CollectionOption />}
    </div>
  )
}

export default Collection;