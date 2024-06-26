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
import createTokenProvider, { createAuthProvider } from "../utils/tokens";
import { useNavigate } from "react-router-dom";

function Collections({ props }) {
  const { displayTasksOptions, setDisplayTasksOptions } = props;

  const { getToken } = createTokenProvider();
  const { logout } = createAuthProvider();
  const [activeCollection, setActiveCollection] = useState("");
  const navigate = useNavigate();
  const showToast = useToast();
  const [collections, setCollections] = useState([]);

  const handleGetAllCollections = async () => {
    let accessToken = await getToken().then((res) => res);

    await getAllCollectionsRequest(accessToken)
      .then((res) => {
        setCollections(res.collections);
      })
      .catch((rej) => {
        if (rej["message"] === "Invalid token") {
          showToast.info("Session expired, please log in again");
          navigate("/");
          logout();
        } else {
          showToast.error(rej["message"]);
        }
      });
  };

  const handleCreateCollection = async (collectionData) => {
    let accessToken = await getToken().then((res) => res);

    try {
      const res = await createCollectionRequest(accessToken, collectionData);
      showToast.success(res["message"]);
    } catch (rej) {
      if (rej.message === "Invalid token") {
        showToast.info("Session expired, please log in again");
        navigate("/");
        logout();
      } else {
        showToast.error(rej["message"]);
      }
    }
    await handleGetAllCollections();
  };

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

  useEffect(() => {
    handleGetAllCollections();
  }, []);

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
                handleGetAllCollections={handleGetAllCollections}
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
