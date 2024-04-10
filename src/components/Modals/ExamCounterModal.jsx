import PropTypes from "prop-types";
import Modal from "./Modal";
import ExamCounterForm from "../Form/ExamCounterForm";
import { useToast } from "../utils/hooks";
import { useState } from "react";
import { createExamCounterRequest } from "../../services/api";
import createTokenProvider, { createAuthProvider } from "../utils/tokens";
import { useNavigate } from "react-router-dom";

const ExamCounterModal = ({ handleGetAllExamCounters }) => {
  const { getToken } = createTokenProvider();
  const {logout} = createAuthProvider();
  const showToast = useToast();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  const handleCreateExamCounter = async (examCounterData) => {
    let accessToken = await getToken().then((res) => res);

    createExamCounterRequest(accessToken, examCounterData)
      .then((res) => showToast.success(res["message"]))
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

  const examCounterFormProps = {
    setShowModal: setShowModal,
    preventDefaultAction: preventDefaultAction,
    handleCreateExamCounter: handleCreateExamCounter,
    handleGetAllExamCounters: handleGetAllExamCounters,
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
  handleGetAllExamCounters: PropTypes.func,
};

export default ExamCounterModal;
