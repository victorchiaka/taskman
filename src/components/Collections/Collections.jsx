import Collection from './Collection';
import styles from "./Collections.module.css";

// Dummy data import for development
import { data } from "./data";

function Collections() {
  return (
    <>
      <div className={styles.instanceAction}>
        <div>Taskman Collections:&nbsp; <span className={styles.createCollections}>New Collections</span></div>
      </div>
      <div className={styles.collections}>
        {data.collections.map(collection => (
          <Collection key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  )
}

export default Collections;