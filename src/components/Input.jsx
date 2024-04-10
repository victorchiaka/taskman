import PropTypes from "prop-types";

function Input({ name, title, type, value, onChange, required }) {
  return (
    <div className={type === "color" ? "color" : ""}>
      <label htmlFor={name}>{title}</label>
      <input
        placeholder={title}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default Input;
