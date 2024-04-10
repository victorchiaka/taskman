import { useState } from "react";
import { useInput } from "../utils/hooks";
import Button from "../Button/Button";
import Input from "../Input";
import PropTypes from "prop-types";
import LoadingSpinner from "@assets/loading-spinner.svg";

const TaskForm = ({ props }) => {
  const {
    setShowModal,
    preventDefaultAction,
    handleCreateTask,
    activeCollection = "",
    edit,
    setEdit,
    activeTask,
    setActiveTask = () => undefined,
    handleEditTaskDescription,
    handleGetCollectionTasks,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [taskColor, setTaskColor] = useInput("#ffffff");
  const [taskName, setTaskName] = useInput("");
  const [taskDescription, setTaskDescription] = useInput("");
  const [newTaskDescription, setNewTaskDescription] = useInput("");

  const resetStates = () => {
    setTaskColor("#fff");
    setTaskName("");
    setTaskDescription("");
    setNewTaskDescription("");
    setActiveTask("");
    setIsLoading(false);
    setEdit(false);
    setShowModal(false);
  };

  const createTask = async (e) => {
    preventDefaultAction(e);
    setIsLoading(true);
    await handleCreateTask({
      collection_name: activeCollection,
      task_name: taskName.value,
      task_description: taskDescription.value,
      color_code: taskColor.value,
    });

    resetStates();
    await handleGetCollectionTasks();
  };

  const editTaskDescription = async (e) => {
    preventDefaultAction(e);
    setIsLoading(true);
    await handleEditTaskDescription({
      task_name: activeTask,
      new_task_description: newTaskDescription.value,
    });
    resetStates();
    await handleGetCollectionTasks();
  };

  return (
    <form
      className="form task-form"
      onSubmit={edit ? editTaskDescription : createTask}
      onClick={(e) => e.stopPropagation()}
    >
      {edit ? (
        <>
          <div className="form-header">
            <p>Taskman - Edit Task</p>
          </div>
          <Input
            required
            name="new-task-description"
            title="New Task Description"
            type="text"
            {...newTaskDescription}
          />
        </>
      ) : (
        <>
          <div className="form-header">
            <p>Taskman Task</p>
          </div>
          <Input
            required
            name="task_color"
            title="Color"
            type="color"
            {...taskColor}
          />
          <Input
            required
            name="task-name"
            title="Task Name"
            type="text"
            {...taskName}
          />
          <Input
            required
            name="task-description"
            title="Task Description"
            type="text"
            {...taskDescription}
          />
        </>
      )}
      <div className="action-buttons-container">
        <Button
          type="cancel"
          text="Cancel"
          onClick={() => setShowModal(false)}
        />
        <Button
          // onClick={edit ? editTaskDescription : createTask}
          type="confirm submit"
          text={
            isLoading ? (
              <img className="spinner" src={LoadingSpinner}></img>
            ) : edit ? (
              "Edit"
            ) : (
              "Create"
            )
          }
        />
      </div>
    </form>
  );
};

TaskForm.propTypes = {
  props: PropTypes.object,
  setShowModal: PropTypes.func,
  preventDefaultAction: PropTypes.func,
  handleCreateTask: PropTypes.func,
  activeCollection: PropTypes.string,
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  activeTask: PropTypes.string,
  setActiveTask: PropTypes.func,
  handleEditTaskDescription: PropTypes.func,
  handleGetCollectionTasks: PropTypes.func,
};

export default TaskForm;
