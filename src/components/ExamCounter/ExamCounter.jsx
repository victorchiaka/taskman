import ThreeDotsNav from "@assets/three-dots-nav.svg";
import { useState } from "react";
import Options from "../../ui/Options";
import PropTypes from "prop-types";

const ExamCounter = ({ examCounter }) => {
  const [openOptions, setOpenOptions] = useState(false);

  const examCounterColor = {
    backgroundColor: examCounter.color_code,
    width: " 2rem",
    height: "2rem",
    borderRadius: "50%",
  };

  const handleMarkAsExpired = () => {};

  const handleDeleteExamCounter = () => {};

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

  return (
    <div className="exam-counter-card">
      <div>
        <div style={examCounterColor}></div>
        <img src={ThreeDotsNav} onClick={() => setOpenOptions(!openOptions)} />
      </div>
      <div>
        <h3>{examCounter.paper_name}</h3>
        <h4>{examCounter.paper_number}</h4>
        <h4 style={{ color: examCounterColor.backgroundColor }}>
          8: 5: 20: 25
        </h4>
        <small>Until {examCounter.due_at}</small>
      </div>
      {openOptions && <Options props={optionProps} />}
    </div>
  );
};

ExamCounter.propTypes = {
  examCounter: PropTypes.object,
};

export default ExamCounter;
