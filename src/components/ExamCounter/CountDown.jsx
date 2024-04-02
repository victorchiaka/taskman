import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import createTokenProvider from "../utils/tokens";

const CountDown = ({ props }) => {
  const { getTokens } = createTokenProvider();

  const {
    dueAt,
    examCounterName,
    textColor,
    updateExamCounterAsExpiredRequest,
  } = props;
  const [countDown, setCountDown] = useState("");

  const updateExpired = async () => {
    let accessToken = await getTokens().then((res) => res);

    updateExamCounterAsExpiredRequest(accessToken, {
      paper_name: examCounterName,
    })
      .then()
      .catch();
  };

  const calculateTimeLeft = () => {
    const difference =
      new Date(dueAt) - new Date() + new Date().getTimezoneOffset() * 60 * 1000;
    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      expired: false,
    };

    if (difference > 0) {
      timeLeft.days = Math.floor(parseInt(difference) / (1000 * 60 * 60 * 24));
      timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
      timeLeft.seconds = Math.floor((difference / 1000) % 60);
    } else {
      timeLeft.expired = true;
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const timeLeft = calculateTimeLeft();
      if (!timeLeft.expired) {
        setCountDown(
          `${timeLeft["days"]} : ${timeLeft["hours"]} : ${timeLeft["minutes"]} : ${timeLeft["seconds"]}`
        );
      } else {
        updateExpired();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown]);

  return <div style={{ color: textColor }}>{countDown}</div>;
};

CountDown.propTypes = {
  props: PropTypes.object,
  dueAt: PropTypes.string,
  examCounterName: PropTypes.string,
  textColor: PropTypes.string,
  updateExamCounterAsExpiredRequest: PropTypes.func,
};

export default CountDown;
