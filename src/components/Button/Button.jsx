import "./Button.css";
import PropTypes from "prop-types";

export function Button(props) {
  const BUTTON_TYPE = {
    confirm: "confirm",
    delete: "delete",
    cancel: "cancel",
  };

  return (
    <>
      <button
        className={props.type}
        type={BUTTON_TYPE[props.type]}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  );
}

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
