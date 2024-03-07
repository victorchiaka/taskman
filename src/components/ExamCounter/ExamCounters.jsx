import PropTypes from "prop-types";
import ExamCounter from "./ExamCounter";
import data from "./data";

const ExamCounters = ({ props }) => {
  const { setExamFormActive } = props;

  return (
    <>
      <div className="instance-action">
        <div>
          Taskman Exam counter: &nbsp;{" "}
          <span
            className="create-action"
            onClick={() => setExamFormActive(true)}
          >
            New Exam
          </span>
        </div>
      </div>
      <div className="dashboard-contents-container">
        {data.exam_counters.map((examCounter) => (
          <ExamCounter key={examCounter.id} examCounter={examCounter} />
        ))}
      </div>
    </>
  );
};

ExamCounters.propTypes = {
  props: PropTypes.object,
  setExamFormActive: PropTypes.func,
};

export default ExamCounters;
