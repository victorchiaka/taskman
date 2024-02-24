import { useState } from "react";
import Collection from "./Collection";
import styles from "./Collections.module.css";
import Tasks from "../Tasks/Tasks";
import PropTypes from "prop-types";

// Dummy data import for development
import { data } from "./data";

function Collections({ setCollectionFormActive }) {
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
              <span
                onClick={() => setCollectionFormActive(true)}
                className={styles.createCollections}
              >
                New Collections
              </span>
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

Collections.propTypes = {
  setCollectionFormActive: PropTypes.func,
};

export default Collections;
