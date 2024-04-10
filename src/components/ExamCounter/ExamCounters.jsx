import PropTypes from "prop-types";
import ExamCounter from "./ExamCounter";
import { getAllExamCountersRequest } from "../../services/api";
import { useEffect, useState } from "react";
import ExamCounterModal from "../Modals/ExamCounterModal";
import createTokenProvider, { createAuthProvider } from "../utils/tokens";
import { useToast } from "../utils/hooks";
import { useNavigate } from "react-router-dom";

const ExamCounters = () => {
  const [examCounters, setExamCounters] = useState([]);
  const showToast = useToast();
  const navigate = useNavigate();
  const { logout } = createAuthProvider();
  const { getToken } = createTokenProvider();

  const handleGetAllExamCounters = async () => {
    let accessToken = await getToken().then((res) => res);

    await getAllExamCountersRequest(accessToken)
      .then((res) => setExamCounters(res.exam_counters))
      .catch((rej) => {
        if (rej["message"] === "Invalid token") {
          showToast.info("Session expired, please log in again");
          navigate("/");
          logout();
        } else {
          showToast.error(rej["message"]);
        }
      });
  };

  useEffect(() => {
    return async () => handleGetAllExamCounters();
  }, []);

  return (
    <>
      <div className="instance-action">
        <div>
          Taskman Exam counter: &nbsp;{" "}
          <ExamCounterModal
            handleGetAllExamCounters={handleGetAllExamCounters}
          />
        </div>
      </div>
      <div className="dashboard-contents-container">
        {examCounters.map((examCounter) => (
          <ExamCounter
            key={examCounter.id}
            examCounter={examCounter}
            handleGetAllExamCounters={handleGetAllExamCounters}
          />
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
