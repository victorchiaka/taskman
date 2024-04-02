import Collection from "./Collection";
import Tasks from "../Tasks/Tasks";
import PropTypes from "prop-types";
import {
  getAllCollectionsRequest,
  createCollectionRequest,
} from "../../services/api";
import { useState, useEffect } from "react";
import CreateCollectionModal from "../Modals/CreateCollectionModal";
import { useToast } from "../utils/hooks";
import createTokenProvider from "../utils/tokens";

function Collections({ props }) {
  const { displayTasksOptions, setDisplayTasksOptions } = props;

  const { getTokens } = createTokenProvider();

  const [activeCollection, setActiveCollection] = useState("");

  const showToast = useToast();

  const [collections, setCollections] = useState([]);

  const handleGetAllCollections = async () => {
    let accessToken = await getTokens().then((res) => res);

    getAllCollectionsRequest(accessToken).then((res) => {
      setCollections(res.collections);
    });
  };

  const handleCreateCollection = async (collectionData) => {
    let accessToken = await getTokens().then((res) => res);

    createCollectionRequest(accessToken, collectionData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  useEffect(() => {
    handleGetAllCollections();

    const interval = setInterval(async () => {
      await handleGetAllCollections();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const displayTasks = (collection) => {
    setActiveCollection(collection.collection_name);
    setDisplayTasksOptions({
      display: true,
      collection: collection,
    });
  };

  const createCollectionModalProps = {
    activeCollection: activeCollection,
    setActiveCollection: setActiveCollection,
    handleCreateCollection: handleCreateCollection,
  };

  const tasksProps = {
    setDisplayTasksOptions: setDisplayTasksOptions,
    collection: displayTasksOptions.collection,
    setActiveCollection: setActiveCollection,
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
              <CreateCollectionModal props={createCollectionModalProps} />
            </div>
          </div>

          <div className="dashboard-contents-container">
            {collections.map((collection) => (
              <Collection
                onClick={displayTasks}
                collection={collection}
                key={collection.id}
                setActiveCollection={setActiveCollection}
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
