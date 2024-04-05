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
import DeleteTaskModal from "../Modals/DeleteTaskModal";
import MarkAsCompletedModal from "../Modals/MarkAsCompletedModal";
import createTokenProvider, { createAuthProvider } from "../utils/tokens";

const Task = ({ task }) => {
  const operations = {
    NONE: "",
    EDIT_DESCRIPTION: "editDescription",
    DELETE_TASK: "deleteTask",
    MARK_AS_COMPLETED: "markAsCompleted",
  };

  const showToast = useToast();
  const [openOptions, setOpenOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState("");
  const [operation, setOperation] = useState(operations.NONE);
  const [edit, setEdit] = useState(false);

  const { getToken } = createTokenProvider();
  const { logout } = createAuthProvider();

  const setup = () => {
    setShowModal(true);
    setActiveTask(task.task_name);
  };

  const setEditTaskDescription = () => {
    setEdit(true);
    setOperation(operations.EDIT_DESCRIPTION);
    setup();
  };

  const setDeleteTask = () => {
    setOperation(operations.DELETE_TASK);
    setup();
  };

  const setMarkAsCompleted = () => {
    setOperation(operations.MARK_AS_COMPLETED);
    setup();
  };

  const handleEditTaskDescription = async (taskData) => {
    let accessToken = await getToken().then((res) => res);

    editTaskRequest(accessToken, taskData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => {
        if (rej["message"] === "Invalid token") {
          showToast.info("Session expired, please log in again");
          logout();
        }
      });
  };

  const handleMarkTaskAsCompleted = async () => {
    let accessToken = await getToken().then((res) => res);

    updateCompletedTaskRequest(accessToken, { task_name: task.task_name })
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => {
        if (rej["message"] === "Invalid token") {
          showToast.info("Session expired, please log in again");
          logout();
        }
      });

    setShowModal(false);
  };

  const handleDeleteTask = async () => {
    let accessToken = await getToken().then((res) => res);

    deleteTaskRequest(accessToken, { task_name: task.task_name })
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => {
        if (rej["message"] === "Invalid token") {
          showToast.info("Session expired, please log in again");
          logout();
        }
      });
  };

  const editTaskDescriptionProps = {
    edit: edit,
    setEdit: setEdit,
    activeTask: activeTask,
    setActiveTask: setActiveTask,
    showModal: showModal,
    setShowModal: setShowModal,
    handleEditTaskDescription: handleEditTaskDescription,
  };

  const deleteTaskProps = {
    showModal: showModal,
    setShowModal: setShowModal,
    handleDeleteTask: handleDeleteTask,
  };

  const markAsCompletedProps = {
    showModal: showModal,
    setShowModal: setShowModal,
    handleMarkTaskAsCompleted: handleMarkTaskAsCompleted,
  };

  let options = [];

  if (!task.is_completed) {
    options = [
      {
        optionName: "Edit description",
        onClick: setEditTaskDescription,
        icon: editIcon,
      },
      {
        optionName: "Mark as complete",
        onClick: setMarkAsCompleted,
        icon: doneIcon,
      },
      {
        optionName: "Delete",
        onClick: setDeleteTask,
        icon: deleteIcon,
      },
    ];
  } else {
    options = [
      {
        optionName: "Delete",
        onClick: setDeleteTask,
        icon: deleteIcon,
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
      {operation === operations.DELETE_TASK ? (
        <DeleteTaskModal {...deleteTaskProps} />
      ) : operation === operations.EDIT_DESCRIPTION ? (
        <EditTaskDescriptionModal props={editTaskDescriptionProps} />
      ) : operation === operations.MARK_AS_COMPLETED ? (
        <MarkAsCompletedModal {...markAsCompletedProps} />
      ) : null}
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
