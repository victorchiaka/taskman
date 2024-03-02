import Collection from "./Collection";
import styles from "./Collections.module.css";
import Tasks from "../Tasks/Tasks";
import PropTypes from "prop-types";

function Collections({ props }) {
  const {
    collections,
    setCollectionFormActive,
    setTaskFormActive,
    setActiveCollection,
    displayTasksOptions,
    setDisplayTasksOptions,
  } = props;

  const displayTasks = (collection) => {
    setActiveCollection(collection.collection_name);
    setDisplayTasksOptions({
      display: true,
      collection: collection,
    });
  };

  return (
    <>
      {displayTasksOptions.display ? (
        <Tasks
          setDisplayTasksOptions={setDisplayTasksOptions}
          collection={displayTasksOptions.collection}
          setTaskFormActive={setTaskFormActive}
          setActiveCollection={setActiveCollection}
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
            {collections.map((collection) => (
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
  props: PropTypes.object,
  collections: PropTypes.object,
  setCollectionFormActive: PropTypes.func,
  setTaskFormActive: PropTypes.func,
  setActiveCollection: PropTypes.func,
  display: PropTypes.bool,
  displayTasksOptions: PropTypes.object,
  setDisplayTasksOptions: PropTypes.func,
  collection: PropTypes.object,
};

export default Collections;
