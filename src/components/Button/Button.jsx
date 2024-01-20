import "./Button.css";
import PropTypes from "prop-types";

export function Button(props) {
  return <button className={props.type}>{props.text}</button>;
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
