import { useState } from "react";
import styles from "./Collections.module.css";
import ThreeDotsNav from "@assets/three-dots-nav.svg";

const CollectionOption = () => {
  return (
    <>
      <div>Rename Collection</div>
      <div>Delete Collection</div>
    </>
  );
}

const Collection = () => {
  const [openCollectionOption, setOpenCollectionOption] = useState(true);

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

      { openCollectionOption && <CollectionOption />}
    </div>
  )
}

export default Collection;