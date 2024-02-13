import styles from "./Collections.module.css";
import ThreeDotsNav from "@assets/three-dots-nav.svg";

const Collection = () => {
  return (
    <div className={styles.collectionCard}>
      <div>
        <div className={styles.collectionColor}></div>
        <img src={ThreeDotsNav} className={styles.options}></img>
      </div>
      <div>
        <h3>Goal</h3>
        <small>Thurs: 11 Jan 2024</small>
      </div>
    </div>
  )
}

export default Collection;