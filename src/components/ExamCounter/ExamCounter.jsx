import ThreeDotsNav from "@assets/three-dots-nav.svg";
import { useState } from "react";
import Options from "../../ui/Options";
import PropTypes from "prop-types";
import CountDown from "./CountDown";

import {
  updateExamCounterAsExpiredRequest,
  deleteExamCounterRequest,
  refreshAccessTokenRequest,
} from "../../services/api";
import { useToast, useAuth } from "../utils/hooks";
import { isTokenExpired } from "../utils/tokens";

const ExamCounter = ({ examCounter }) => {
  const auth = useAuth();

  let accessToken = localStorage.getItem("access_token");

  if (isTokenExpired(localStorage.getItem("access_token"))) {
    refreshAccessTokenRequest({
      refresh_token: localStorage.getItem("refresh_token"),
    }).then((res) => auth.login(res["tokens"]));
    accessToken = localStorage.getItem("access_token");
  }

  const [openOptions, setOpenOptions] = useState(false);

  const showToast = useToast();

  const examCounterColor = {
    backgroundColor: examCounter.is_expired ? "grey" : examCounter.color_code,
    width: " 2rem",
    height: "2rem",
    borderRadius: "50%",
  };

  const handleMarkAsExpired = () => {
    updateExamCounterAsExpiredRequest(accessToken, {
      paper_name: examCounter.paper_name,
    })
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const handleDeleteExamCounter = () => {
    deleteExamCounterRequest(accessToken, {
      paper_name: examCounter.paper_name,
    })
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const optionProps = {
    options: [
      {
        optionName: "Mark as expired",
        onClick: handleMarkAsExpired,
      },
      {
        optionName: "Delete",
        onClick: handleDeleteExamCounter,
      },
    ],
  };

  const countDownProps = {
    dueAt: examCounter.due_at,
    examCounterName: examCounter.paper_name,
    textColor: examCounterColor.backgroundColor,
    updateExamCounterAsExpiredRequest: updateExamCounterAsExpiredRequest,
  };

  return (
    <div className="exam-counter-card">
      <div>
        <div style={examCounterColor}></div>
        <img src={ThreeDotsNav} onClick={() => setOpenOptions(!openOptions)} />
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
                      onClick: handleDeleteExamCounter,
                    },
                  ],
                }
              : optionProps
          }
        />
      )}
    </div>
  );
};

ExamCounter.propTypes = {
  examCounter: PropTypes.object,
};

export default ExamCounter;
