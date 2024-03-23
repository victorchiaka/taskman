import PropTypes from "prop-types";
import Modal from "./Modal";
import TaskForm from "../Form/TaskForm";
import { useState } from "react";

const EditTaskDescriptionModal = ({ props }) => {
  const {
    activeTask,
    setActiveTask,
    showModal,
    setShowModal,
    handleEditTaskDescription,
  } = props;

  const [edit, setEdit] = useState(true);

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  const taskFormProps = {
    edit: edit,
    setEdit: setEdit,
    activeTask: activeTask,
    setActiveTask: setActiveTask,
    setShowModal: setShowModal,
    preventDefaultAction: preventDefaultAction,
    handleEditTaskDescription: handleEditTaskDescription,
  };

  const modalProps = {
    showModal,
    setShowModal,
    isForm: true,
    children: <TaskForm props={taskFormProps} />,
  };
  return (
    <>
      <Modal {...modalProps} />
    </>
  );
};

EditTaskDescriptionModal.propTypes = {
  props: PropTypes.object,
  showModal: PropTypes.bool,
  activeTask: PropTypes.string,
  setShowModal: PropTypes.func,
  setActiveTask: PropTypes.func,
  handleEditTaskDescription: PropTypes.func,
};

export default EditTaskDescriptionModal;
