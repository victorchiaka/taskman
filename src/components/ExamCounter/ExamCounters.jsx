import PropTypes from "prop-types";
import ExamCounter from "./ExamCounter";
import { getAllExamCountersRequest } from "../../services/api";
import { useEffect, useState } from "react";
import ExamCounterModal from "../Modals/ExamCounterModal";
import createTokenProvider from "../utils/tokens";

const ExamCounters = () => {
  const [examCounters, setExamCounters] = useState([]);

  const { getTokens } = createTokenProvider();

  const handleGetAllExamCounters = async () => {
    let accessToken = await getTokens().then((res) => res);

    getAllExamCountersRequest(accessToken).then((res) =>
      setExamCounters(res.exam_counters)
    );
  };

  useEffect(() => {
    handleGetAllExamCounters();
    const interval = setInterval(() => {
      handleGetAllExamCounters();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="instance-action">
        <div>
          Taskman Exam counter: &nbsp; <ExamCounterModal />
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
