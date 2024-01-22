import "./Button.css";
import PropTypes from "prop-types";

export function Button(props) {
  return (
    <button className={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
