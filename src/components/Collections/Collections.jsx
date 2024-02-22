import { useState } from "react";
import Collection from "./Collection";
import styles from "./Collections.module.css";

// Dummy data import for development
import { data } from "./data";
import Tasks from "../Tasks/Tasks";

function Collections() {
  const [displayTasksOptions, setDisplayTaskOptions] = useState({
    display: false,
    collection: null,
  });

  const displayTasks = (collection) => {
    setDisplayTaskOptions({
      display: true,
      collection: collection,
    });
  };

  return (
    <>
      {displayTasksOptions.display ? (
        <Tasks
          setDisplayTaskOptions={setDisplayTaskOptions}
          collection={displayTasksOptions.collection}
        />
      ) : (
        <>
          <div className={styles.instanceAction}>
            <div>
              Taskman Collections:&nbsp;{" "}
              <span className={styles.createCollections}>New Collections</span>
            </div>
          </div>

          <div className={styles.collections}>
            {data.collections.map((collection) => (
              <Collection
                onClick={displayTasks}
                key={collection.id}
                collection={collection}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Collections;
