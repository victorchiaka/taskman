import styles from "./Tasks.module.css";
import back from "@assets/back.svg";
import Task from "./Task";
import PropTypes from "prop-types";
import { getCollectionTasksRequest } from "../../services/api";
import { useEffect, useState } from "react";
import { getCollectionStatisticsRequest } from "../../services/api";
import AddTaskModal from "../Modals/AddTaskModal";
import createTokenProvider, { createAuthProvider } from "../utils/tokens";
import { useToast } from "../utils/hooks";
import { useNavigate } from "react-router-dom";

const TasksInstanceAction = ({ props, collectionStatistics }) => {
  const {
    collection,
    setDisplayTasksOptions,
    setActiveCollection,
    handleGetCollectionTasks,
  } = props;

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  const addTaskModalProps = {
    activeCollection: collection.collection_name,
    preventDefaultAction: preventDefaultAction,
    handleGetCollectionTasks: handleGetCollectionTasks,
  };

  return (
    <div className={styles.instanceAction}>
      <div className={styles.tasksAction}>
        <span
          onClick={() => {
            setActiveCollection("");
            setDisplayTasksOptions({
              display: false,
              collection: {},
            });
          }}
          className="back-button"
        >
          <img src={back} />
          Back
        </span>
        &nbsp; <h4>{collection.collection_name}</h4>
      </div>
      <AddTaskModal props={addTaskModalProps} />
      <div className={styles.tasksInfo}>
        <div>All: {collectionStatistics.all}</div>
        <div>Completed: {collectionStatistics.completed}</div>
      </div>
    </div>
  );
};

const Tasks = ({ props }) => {
  const { collection, setDisplayTasksOptions, setActiveCollection } = props;

  const [collectionStatistics, setCollectionStatistics] = useState({
    all: 0,
    completed: 0,
  });

  const { getToken } = createTokenProvider();
  const { logout } = createAuthProvider();
  const [tasks, setTasks] = useState([]);
  const showToast = useToast();
  const navigate = useNavigate();

  const handleGetCollectionStatisticsRequest = async () => {
    let accessToken = await getToken().then((res) => res);

    const data = {
      collection_name: collection.collection_name,
    };

    await getCollectionStatisticsRequest(accessToken, data)
      .then((res) => {
        const stats = res["stats"];
        setCollectionStatistics({
          all: stats["overall_count"],
          completed: stats["completed_count"],
        });
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

  const handleGetCollectionTasks = async () => {
    let accessToken = await getToken().then((res) => res);

    const data = { collection_id: collection.id };
    await getCollectionTasksRequest(accessToken, data)
      .then((res) => {
        setTasks(res["tasks"]);
        handleGetCollectionStatisticsRequest();
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

  useEffect(() => {
    handleGetCollectionTasks();
  }, []);

  const taskInstanceOptionProps = {
    collection: collection,
    setDisplayTasksOptions: setDisplayTasksOptions,
    setActiveCollection: setActiveCollection,
    handleGetCollectionTasks: handleGetCollectionTasks,
  };

  return (
    <>
      <TasksInstanceAction
        collectionStatistics={collectionStatistics}
        props={taskInstanceOptionProps}
      />
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleGetCollectionTasks={handleGetCollectionTasks}
          />
        ))}
      </div>
    </>
  );
};

TasksInstanceAction.propTypes = {
  props: PropTypes.object,
  collection: PropTypes.object,
  setDisplayTasksOptions: PropTypes.func,
  setTaskFormActive: PropTypes.func,
  setActiveCollection: PropTypes.func,
  handleGetCollectionTasks: PropTypes.func,
  collectionStatistics: PropTypes.object,
};

Tasks.propTypes = {
  props: PropTypes.object,
  collection: PropTypes.object,
  setDisplayTasksOptions: PropTypes.func,
  setTaskFormActive: PropTypes.func,
  setActiveCollection: PropTypes.func,
  setIsTaskEdit: PropTypes.func,
  setActiveTask: PropTypes.func,
};

export default Tasks;
