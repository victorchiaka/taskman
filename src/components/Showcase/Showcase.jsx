import ShowcaseCard from "./ShowcaseCard";
import styles from "./Showcase.module.css";

import AddTaskImage from "@assets/add-tasks.svg";
import ExamTaskImage from "@assets/exams-tasks.svg";
import TaskStatisticsImage from "@assets/task-statistics.svg";

const showcaseImages = [
  {
    url: AddTaskImage,
    title: "Add Task",
    info: "Create and add tasks in collections",
  },
  {
    url: ExamTaskImage,
    title: "Exam Counter",
    info: "Plan and prepare for your exams",
  },
  {
    url: TaskStatisticsImage,
    title: "Statistics",
    info: "Get statistics about your tasks",
  },
];

function Showcase() {
  return (
    <div className={styles.showcase}>
      {showcaseImages.map((image) => {
        return <ShowcaseCard {...image} key={image.url} />;
      })}
    </div>
  );
}

export default Showcase;
