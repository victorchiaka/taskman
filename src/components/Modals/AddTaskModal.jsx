import add from "@assets/add.svg";
import { useState } from "react";
import TaskForm from "../Form/TaskForm";
import Modal from "./Modal";
import PropTypes from "prop-types";
import { createTaskRequest } from "../../services/api";
import { useToast } from "../utils/hooks";
import createTokenProvider, { createAuthProvider } from "../utils/tokens";
import { useNavigate } from "react-router-dom";

const AddTaskModal = ({ props }) => {
  const { activeCollection, preventDefaultAction, handleGetCollectionTasks } =
    props;

  const { getToken } = createTokenProvider();
  const { logout } = createAuthProvider();
  const showToast = useToast();
  const navigate = useNavigate();

  const handleCreateTask = async (taskData) => {
    let accessToken = await getToken().then((res) => res);

    await createTaskRequest(accessToken, taskData)
      .then((res) => showToast.success(res["message"]))
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

  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);

  const taskFormProps = {
    edit: edit,
    setEdit: setEdit,
    setShowModal: setShowModal,
    activeCollection: activeCollection,
    preventDefaultAction: preventDefaultAction,
    handleCreateTask: handleCreateTask,
    handleGetCollectionTasks: handleGetCollectionTasks,
  };

  const modalProps = {
    showModal,
    setShowModal,
    isForm: true,
    children: <TaskForm props={taskFormProps} />,
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="add-task" onClick={openModal}>
        <img src={add} />
        Add Task
      </div>
      <Modal {...modalProps} />
    </>
  );
};

AddTaskModal.propTypes = {
  props: PropTypes.object,
  activeCollection: PropTypes.string,
  preventDefaultAction: PropTypes.func,
  handleGetCollectionTasks: PropTypes.func,
};

export default AddTaskModal;
