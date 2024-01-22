import PropTypes from "prop-types";

function Form(props) {
  let { fields } = props.template;

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
