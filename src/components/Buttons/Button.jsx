import styles from "./Button.module.css";
import PropTypes from "prop-types";

export function Button(props) {
  if (props.type === "homeSignup") {
    return <button className={styles.homeSignupButton}>{props.text}</button>;
  }
  return <button className={props.type}>{props.text}</button>;
}

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
