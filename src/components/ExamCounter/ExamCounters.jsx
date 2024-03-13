import PropTypes from "prop-types";
import ExamCounter from "./ExamCounter";
import { getAllExamCountersRequest } from "../../services/api";
import { useEffect, useState } from "react";

const ExamCounters = ({ props }) => {
  const { setExamFormActive } = props;

  const [examCounters, setExamCounters] = useState([]);
  const jwtToken = localStorage.getItem("access_token");

  const handleGetAllExamCounters = () => {
    getAllExamCountersRequest(jwtToken).then((res) =>
      setExamCounters(res.exam_counters)
    );
  };

  useEffect(() => {
    handleGetAllExamCounters();
    const interval = setInterval(() => {
      handleGetAllExamCounters();
    }, 1000);

    return () => clearInterval(interval);
  }, [examCounters]);

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
        {examCounters.map((examCounter) => (
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
