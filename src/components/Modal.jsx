import PropTypes from "prop-types";

function Modal({ children, isActive, isForm }) {
  return isActive ? <div className={isForm ? "modal" : "plain-modal"}>{children}</div> : null;
}

Modal.propTypes = {
  children: PropTypes.object,
  isActive: PropTypes.bool,
  isForm: PropTypes.bool
};

export default Modal;
