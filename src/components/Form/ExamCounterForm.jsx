import { useState } from "react";
import { useInput } from "../utils/hooks";
import Input from "../Input";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import LoadingSpinner from "@assets/loading-spinner.svg";

const ExamCounterForm = ({ props }) => {
  const { setActive, preventDefaultAction, handleCreateExamCounter } = props;

  const [paperName, setPaperName] = useInput("");
  const [paperNumber, setPaperNumber] = useInput("");
  const [dueAt, setDueAt] = useInput(new Date(Date.now() + 60_000));
  const [paperColor, setPaperColor] = useInput("#ffffff");
  const [isCreationLoading, setIsCreationLoading] = useState(false);

  const resetStates = () => {
    setPaperName("");
    setPaperNumber("");
    setDueAt(new Date(Date.now() + 60_000));
    setPaperColor("#ffffff");
    setIsCreationLoading(false);
  };

  const createExamCounter = () => {
    setIsCreationLoading(true);
    handleCreateExamCounter({
      paper_name: paperName.value,
      paper_number: paperNumber.value,
      color_code: paperColor.value,
      due_at: dueAt.value,
    });
    resetStates();
    setActive(false);
  };

  return (
    <form
      className="form exam-counter-form"
      onSubmit={(e) => preventDefaultAction(e)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="form-header">
        <p>Taskman - Exam counter</p>
      </div>
      <Input
        required
        name="paper-name"
        title="Paper name"
        type="text"
        {...paperName}
      />
      <Input
        required
        name="paper-number"
        title="Paper number"
        type="text"
        {...paperNumber}
      />
      <Input
        required
        name="due-at"
        title="Due at"
        type="datetime-local"
        {...dueAt}
      />
      <Input
        required
        name="paper-color"
        title="Color"
        type="color"
        {...paperColor}
      />
      <div className="action-buttons-container">
        <Button type="cancel" text="Cancel" onClick={() => setActive(false)} />
        <Button
          type="confirm"
          onClick={createExamCounter}
          text={isCreationLoading ? <img src={LoadingSpinner} /> : "Create"}
        />
      </div>
    </form>
  );
};

ExamCounterForm.propTypes = {
  props: PropTypes.object,
  setActive: PropTypes.func,
  preventDefaultAction: PropTypes.func,
  handleCreateExamCounter: PropTypes.func,
};

export default ExamCounterForm;
