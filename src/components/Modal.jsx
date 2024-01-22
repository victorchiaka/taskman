import PropTypes from "prop-types";

function Modal({ children, isActive }) {
  return isActive ? <div className="modal">{children}</div> : null;
}

Modal.propTypes = {
  children: PropTypes.object,
  isActive: PropTypes.bool,
};

export default Modal;
