import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Tasks.module.css";
import threeDotsNav from "@assets/three-dots-nav.svg";
import Options from "../../ui/Options";

const Task = ({ task }) => {
  const options = ["Edit title", "Mark as done"];
  const [openOptions, setOpenOptions] = useState(false);

  const borderColor = {
    borderLeft: `0.4rem solid ${task.color_code}`,
  };

  return (
    <div
      title={task.task_description}
      style={borderColor}
      className={styles.taskCard}
    >
      <div className={styles.taskHeader}>
        <h4>{task.task_name}</h4>
        <img
          onClick={(e) => {
            e.stopPropagation();
            setOpenOptions(!openOptions);
          }}
          src={threeDotsNav}
        />
      </div>
      <p>{task.task_description}</p>
      {openOptions && <Options options={options} />}
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.object,
};

export default Task;
