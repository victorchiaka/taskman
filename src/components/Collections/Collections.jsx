import Collection from "./Collection";
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
    setIsCollectionEdit,
    isTaskEdit,
    setIsTaskEdit,
    setActiveTask,
  } = props;

  const displayTasks = (collection) => {
    setActiveCollection(collection.collection_name);
    setDisplayTasksOptions({
      display: true,
      collection: collection,
    });
  };

  const tasksProps = {
    setDisplayTasksOptions: setDisplayTasksOptions,
    collection: displayTasksOptions.collection,
    setTaskFormActive: setTaskFormActive,
    setActiveCollection: setActiveCollection,
    isTaskEdit: isTaskEdit,
    setIsTaskEdit: setIsTaskEdit,
    setActiveTask: setActiveTask,
  };

  return (
    <>
      {displayTasksOptions.display ? (
        <Tasks props={tasksProps} />
      ) : (
        <>
          <div className="instance-action">
            <div>
              Taskman Collections:&nbsp;{" "}
              <span
                onClick={() => setCollectionFormActive(true)}
                className="create-action"
              >
                New Collection
              </span>
            </div>
          </div>

          <div className="dashboard-contents-container">
            {collections.map((collection) => (
              <Collection
                onClick={displayTasks}
                collection={collection}
                key={collection.id}
                setIsCollectionEdit={setIsCollectionEdit}
                setActiveCollection={setActiveCollection}
                setCollectionFormActive={setCollectionFormActive}
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
  setIsCollectionEdit: PropTypes.func,
  isTaskEdit: PropTypes.bool,
  setIsTaskEdit: PropTypes.func,
  setActiveTask: PropTypes.func,
};

export default Collections;
