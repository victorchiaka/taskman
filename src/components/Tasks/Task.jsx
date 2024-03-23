import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Tasks.module.css";
import threeDotsNav from "@assets/three-dots-nav.svg";
import deleteIcon from "@assets/delete.svg";
import editIcon from "@assets/edit.svg";
import doneIcon from "@assets/done.svg";
import Options from "../../ui/Options";
import {
  updateCompletedTaskRequest,
  deleteTaskRequest,
  editTaskRequest,
} from "../../services/api";
import { useToast } from "../utils/hooks";
import EditTaskDescriptionModal from "../Modals/EditTaskDescriptionModal";

const Task = ({ task }) => {
  const showToast = useToast();
  const [openOptions, setOpenOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState("");
  const accessToken = localStorage.getItem("access_token");

  const setUpEditTaskDescription = () => {
    setShowModal(true);
    setActiveTask(task.task_name);
  };

  const handleEditTaskDescription = (taskData) => {
    editTaskRequest(accessToken, taskData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const handleMarkTaskAsCompleted = () => {
    updateCompletedTaskRequest(accessToken, { task_name: task.task_name })
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const editTaskDescriptionProps = {
    activeTask: activeTask,
    setActiveTask: setActiveTask,
    showModal: showModal,
    setShowModal: setShowModal,
    handleEditTaskDescription: handleEditTaskDescription,
  };

  const handleDeleteTask = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTaskRequest(accessToken, { task_name: task.task_name })
        .then((res) => showToast.success(res["message"]))
        .catch((rej) => showToast.error(rej["message"]));
    }
    return;
  };

  let options = [];

  if (!task.is_completed) {
    options = [
      {
        optionName: "Edit description",
        onClick: setUpEditTaskDescription,
        icon: editIcon,
      },
      {
        optionName: "Mark as complete",
        onClick: handleMarkTaskAsCompleted,
        icon: doneIcon,
      },
      {
        optionName: "Delete",
        onClick: handleDeleteTask,
        icon: deleteIcon,
      },
    ];
  } else {
    options = [
      {
        optionName: "Delete",
        onClick: handleDeleteTask,
      },
    ];
  }

  const optionProps = {
    options: options,
  };

  const borderColor = {
    borderLeft: `0.4rem solid ${task.color_code}`,
  };

  const completedBorderColor = {
    borderLeft: `0.4rem solid #3a3a3a`,
  };

  const completedStrikeText = {
    textDecoration: `line-through`,
  };

  return (
    <>
      <EditTaskDescriptionModal props={editTaskDescriptionProps} />
      <div
        title={task.task_description}
        style={task.is_completed ? completedBorderColor : borderColor}
        className={styles.taskCard}
      >
        <div className={styles.taskHeader}>
          <h4 style={task.is_completed ? completedStrikeText : null}>
            {task.task_name}
          </h4>
          <img
            onClick={(e) => {
              e.stopPropagation();
              setOpenOptions(!openOptions);
            }}
            src={threeDotsNav}
          />
        </div>
        <p style={task.is_completed ? completedStrikeText : null}>
          {task.task_description}
        </p>
        {openOptions && <Options props={optionProps} />}
      </div>
    </>
  );
};

Task.propTypes = {
  task: PropTypes.object,
  setTaskFormActive: PropTypes.func,
  setIsTaskEdit: PropTypes.func,
  setActiveTask: PropTypes.func,
};

export default Task;
