import add from "@assets/add.svg";
import { useState } from "react";
import TaskForm from "../Form/TaskForm";
import Modal from "./Modal";
import PropTypes from "prop-types";
import { createTaskRequest } from "../../services/api";
import { useToast } from "../utils/hooks";

const AddTaskModal = ({ props }) => {
  const { activeCollection, preventDefaultAction } = props;

  const accessToken = localStorage.getItem("access_token");

  const showToast = useToast();

  const handleCreateTask = (taskData) => {
    createTaskRequest(accessToken, taskData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
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
};

export default AddTaskModal;
