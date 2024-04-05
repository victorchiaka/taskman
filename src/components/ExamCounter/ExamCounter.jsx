import ThreeDotsNav from "@assets/three-dots-nav.svg";
import { useState } from "react";
import Options from "../../ui/Options";
import PropTypes from "prop-types";
import CountDown from "./CountDown";
import deleteIcon from "@assets/delete.svg";
import expiredIcon from "@assets/hour-glass.svg";

import {
  updateExamCounterAsExpiredRequest,
  deleteExamCounterRequest,
} from "../../services/api";
import { useToast } from "../utils/hooks";
import createTokenProvider, { createAuthProvider } from "../utils/tokens";
import DeleteExamCounterModal from "../Modals/DeleteExamCounter";
import MarkAsExpiredModal from "../Modals/MarkAsExpiredModal";

const ExamCounter = ({ examCounter }) => {
  const operations = {
    NONE: "",
    MARK_AS_EXPIRED: "markAsExpired",
    DELETE_EXAM_COUNTER: "deleteExamCounter",
  };

  const { getTokens } = createTokenProvider();
  const { logout } = createAuthProvider();
  const [showModal, setShowModal] = useState();
  const [openOptions, setOpenOptions] = useState(false);
  const [operation, setOperation] = useState(operations.NONE);

  const showToast = useToast();

  const examCounterColor = {
    backgroundColor: examCounter.is_expired ? "grey" : examCounter.color_code,
    width: " 2rem",
    height: "2rem",
    borderRadius: "50%",
  };

  const handleMarkAsExpired = async () => {
    let accessToken = await getTokens().then((res) => res);

    updateExamCounterAsExpiredRequest(accessToken, {
      paper_name: examCounter.paper_name,
    })
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => {
        if (rej["message"] === "Invalid token") {
          showToast.info("Session expired, please log in again");
          logout();
        }
      });
    setShowModal(false);
  };

  const handleDeleteExamCounter = async () => {
    let accessToken = await getTokens().then((res) => res);

    deleteExamCounterRequest(accessToken, {
      paper_name: examCounter.paper_name,
    })
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => {
        if (rej["message"] === "Invalid token") {
          showToast.info("Session expired, please log in again");
          logout();
        }
      });
  };

  const setup = () => {
    setShowModal(true);
  };

  const setDeleteExamCounter = () => {
    setOperation(operations.DELETE_EXAM_COUNTER);
    setup();
  };

  const setMarkAsExpired = () => {
    setOperation(operations.MARK_AS_EXPIRED);
    setup();
  };

  const optionProps = {
    options: [
      {
        optionName: "Mark as expired",
        onClick: setMarkAsExpired,
        icon: expiredIcon,
      },
      {
        optionName: "Delete",
        onClick: setDeleteExamCounter,
        icon: deleteIcon
      },
    ],
  };

  const deleteExamCounterProps = {
    showModal: showModal,
    setShowModal: setShowModal,
    handleDeleteExamCounter: handleDeleteExamCounter,
  };

  const markAsExpiredProps = {
    showModal: showModal,
    setShowModal: setShowModal,
    handleMarkAsExpired: handleMarkAsExpired,
  };

  const countDownProps = {
    dueAt: examCounter.due_at,
    examCounterName: examCounter.paper_name,
    textColor: examCounterColor.backgroundColor,
    updateExamCounterAsExpiredRequest: updateExamCounterAsExpiredRequest,
  };

  return (
    <>
      {operation === operations.DELETE_EXAM_COUNTER ? (
        <DeleteExamCounterModal {...deleteExamCounterProps} />
      ) : operation === operations.MARK_AS_EXPIRED ? (
        <MarkAsExpiredModal {...markAsExpiredProps} />
      ) : null}
      <div className="exam-counter-card">
        <div>
          <div style={examCounterColor}></div>
          <img
            src={ThreeDotsNav}
            onClick={() => setOpenOptions(!openOptions)}
          />
        </div>
        <div
          className={`exam-counter-details ${
            examCounter.is_expired ? "expired-counter" : ""
          }`}
        >
          <h3
            style={{
              color: examCounter.is_expired
                ? examCounterColor.backgroundColor
                : "",
            }}
          >
            {examCounter.paper_name}
          </h3>
          <h4
            style={{
              color: examCounter.is_expired
                ? examCounterColor.backgroundColor
                : "",
            }}
          >
            {examCounter.paper_number}
          </h4>
          {examCounter.is_expired ? (
            <h4
              style={{
                color: examCounter.is_expired
                  ? examCounterColor.backgroundColor
                  : "",
              }}
            >
              {" "}
              EXPIRED
            </h4>
          ) : (
            <h4>
              <CountDown
                style={{ color: examCounterColor.backgroundColor }}
                props={countDownProps}
              />
            </h4>
          )}
          <small
            style={{
              color: examCounter.is_expired
                ? examCounterColor.backgroundColor
                : "",
            }}
          >
            Until {examCounter.due_at}
          </small>
        </div>
        {openOptions && (
          <Options
            props={
              examCounter.is_expired
                ? {
                    options: [
                      {
                        optionName: "Delete",
                        onClick: setDeleteExamCounter,
                      },
                    ],
                  }
                : optionProps
            }
          />
        )}
      </div>
    </>
  );
};

ExamCounter.propTypes = {
  examCounter: PropTypes.object,
};

export default ExamCounter;
