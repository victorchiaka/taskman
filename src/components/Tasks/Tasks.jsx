import styles from "./Tasks.module.css";
import back from "@assets/back.svg";
import add from "@assets/add.svg";
import Task from "./Task";
import PropTypes from "prop-types";
import { getCollectionTasksRequest } from "../../services/api";
import { useEffect, useState } from "react";
import { getCollectionStatisticsRequest } from "../../services/api";

const TasksInstanceAction = ({ props }) => {
  const {
    collection,
    setDisplayTasksOptions,
    setTaskFormActive,
    setActiveCollection,
  } = props;

  const [collectionStatistics, setCollectionStatistics] = useState({
    all: 0,
    completed: 0,
  });

  const handleGetCollectionStatisticsRequest = () => {
    const data = {
      collection_name: collection.collection_name,
    };

    getCollectionStatisticsRequest(data).then((res) => {
      const stats = res["stats"];
      setCollectionStatistics({
        all: stats["overall_count"],
        completed: stats["completed_count"],
      });
    });
  };

  useEffect(() => {
    handleGetCollectionStatisticsRequest();

    const interval = setInterval(() => {
      handleGetCollectionStatisticsRequest();
    }, 500);

    return () => clearInterval(interval);
  }, []);

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
      <div onClick={() => setTaskFormActive(true)} className={styles.addTask}>
        <img src={add} /> Add Task
      </div>
      <div className={styles.tasksInfo}>
        <div>All: {collectionStatistics.all}</div>
        <div>Completed: {collectionStatistics.completed}</div>
      </div>
    </div>
  );
};

const Tasks = ({
  collection,
  setDisplayTasksOptions,
  setTaskFormActive,
  setActiveCollection,
}) => {
  const [tasks, setTasks] = useState([]);

  const handleGetCollectionTasks = () => {
    const data = { collection_id: collection.id };
    getCollectionTasksRequest(data)
      .then((res) => setTasks(res["tasks"]))
      .catch((rej) => console.error(rej["message"]));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetCollectionTasks();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const taskInstanceOptionProps = {
    collection: collection,
    setDisplayTasksOptions: setDisplayTasksOptions,
    setTaskFormActive: setTaskFormActive,
    setActiveCollection: setActiveCollection,
  };

  return (
    <>
      <TasksInstanceAction props={taskInstanceOptionProps} />
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
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
};

Tasks.propTypes = {
  collection: PropTypes.object,
  setDisplayTasksOptions: PropTypes.func,
  setTaskFormActive: PropTypes.func,
  setActiveCollection: PropTypes.func,
};

export default Tasks;
