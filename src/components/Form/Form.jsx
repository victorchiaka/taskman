import Button from "../Button/Button";
import PropTypes from "prop-types";

function Form(props) {
  let { fields, confirmText } = props.template;

  const renderFields = (fields) => {
    return fields.map((field) => {
      let { title, type, name } = field;
      return (
        <div key={name}>
          <label htmlFor={name}>{title}</label>
          <input type={type} name={name} id={name} />
        </div>
      );
    });
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      {renderFields(fields)}
      <div className="action-buttons-container">
        <Button type="cancel" text="Cancel" />
        <Button type="confirm" text={confirmText} />
      </div>
    </form>
  );
}

Form.propTypes = {
  template: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  fields: PropTypes.array,
  confirmText: PropTypes.string,
};

export default Form;
