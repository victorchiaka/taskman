import { useState } from "react";
import { useInput } from "../utils/hooks";
import Button from "../Button/Button";
import Input from "../Input";
import PropTypes from "prop-types";
import LoadingSpinner from "@assets/loading-spinner.svg";

const TaskForm = ({ props }) => {
  const {
    setActive,
    preventDefaultAction,
    handleCreateTask,
    activeCollection,
  } = props;

  const [isCreationLoading, setIsCreationLoading] = useState(false);
  const [taskColor, setTaskColor] = useInput("#ffffff");
  const [taskName, setTaskName] = useInput("");
  const [taskDescription, setTaskDescription] = useInput("");

  const resetStates = () => {
    setTaskColor("#fff");
    setTaskName("");
    setTaskDescription("");
    setIsCreationLoading(false);
  };

  const createTask = () => {
    setIsCreationLoading(true);
    handleCreateTask({
      collection_name: activeCollection,
      task_name: taskName.value,
      task_description: taskDescription.value,
      color_code: taskColor.value,
    });

    resetStates();
    setActive(false);
  };

  return (
    <form
      className="form task-form"
      onSubmit={(e) => preventDefaultAction(e)}
      onClick={(e) => e.stopPropagation()}
    >
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
      <div className="action-buttons-container">
        <Button type="cancel" text="Cancel" onClick={() => setActive(false)} />
        <Button
          onClick={createTask}
          type="confirm"
          text={
            isCreationLoading ? (
              <img className="spinner" src={LoadingSpinner}></img>
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
  setActive: PropTypes.func,
  preventDefaultAction: PropTypes.func,
  handleCreateTask: PropTypes.func,
  activeCollection: PropTypes.string,
};

export default TaskForm;
