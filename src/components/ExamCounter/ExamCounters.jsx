import PropTypes from "prop-types";
import ExamCounter from "./ExamCounter";
import {
  getAllExamCountersRequest,
  refreshAccessTokenRequest,
} from "../../services/api";
import { useEffect, useState } from "react";
import ExamCounterModal from "../Modals/ExamCounterModal";
import { useAuth } from "../utils/hooks";
import { isTokenExpired } from "../utils/tokens";

const ExamCounters = () => {
  const [examCounters, setExamCounters] = useState([]);

  const auth = useAuth();

  let accessToken = localStorage.getItem("access_token");

  if (isTokenExpired(localStorage.getItem("access_token"))) {
    refreshAccessTokenRequest({
      refresh_token: localStorage.getItem("refresh_token"),
    }).then((res) => auth.login(res["tokens"]));
    accessToken = localStorage.getItem("access_token");
  }

  const handleGetAllExamCounters = () => {
    getAllExamCountersRequest(accessToken).then((res) =>
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
