import PropTypes from "prop-types";

function Modal({ children, setIsActive, isActive, isForm }) {
  return isActive ? <div onClick={() => setIsActive(false)} className={isForm ? "modal" : "plain-modal"}>{children}</div> : null;
}

Modal.propTypes = {
  children: PropTypes.object,
  setIsActive: PropTypes.func,
  isActive: PropTypes.bool,
  isForm: PropTypes.bool
};

export default Modal;
