import PropTypes from "prop-types";
import Modal from "./Modal";
import ExamCounterForm from "../Form/ExamCounterForm";
import { useToast } from "../utils/hooks";
import { useState } from "react";
import { createExamCounterRequest } from "../../services/api";
import createTokenProvider from "../utils/tokens";

const ExamCounterModal = () => {
  const { getTokens } = createTokenProvider();

  const showToast = useToast();
  const [showModal, setShowModal] = useState(false);

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  const handleCreateExamCounter = async (examCounterData) => {
    let accessToken = await getTokens().then((res) => res);

    createExamCounterRequest(accessToken, examCounterData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const examCounterFormProps = {
    setShowModal: setShowModal,
    preventDefaultAction: preventDefaultAction,
    handleCreateExamCounter: handleCreateExamCounter,
  };

  const modalProps = {
    showModal,
    setShowModal,
    isForm: true,
    children: <ExamCounterForm props={examCounterFormProps} />,
  };

  return (
    <>
      <span className="create-action" onClick={() => setShowModal(true)}>
        New Exam
      </span>
      <Modal {...modalProps} />
    </>
  );
};

ExamCounterModal.propTypes = {
  setExamFormActive: PropTypes.func,
  examFormActive: PropTypes.bool,
  examCounterFormProps: PropTypes.object,
};

export default ExamCounterModal;
