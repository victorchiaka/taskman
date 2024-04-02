import PropTypes from "prop-types";

function Modal({ children, showModal, setShowModal, isForm = false }) {
  const styles = {
    width: `100vw`,
    height: `100vh`,
  };

  return showModal ? (
    <div
      style={styles}
      onClick={() => setShowModal(false)}
      className={isForm ? "modal" : "plain-modal"}
    >
      {children}
    </div>
  ) : null;
}

Modal.propTypes = {
  children: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  isForm: PropTypes.bool,
};

export default Modal;
