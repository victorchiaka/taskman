import Button from "../Button/Button";
import Modal from "../Modal";

function Form(props) {
  let { title, type, fields } = props.template;

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
    <Modal>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <h4>Taskman {type}</h4>
          <h4>{title}</h4>
        </div>
        {renderFields(fields)}
        <div className="action-buttons-container">
          <Button type="cancel" text="Cancel" />
          <Button type="confirm" text="Register" />
        </div>
      </form>
    </Modal>
  );
}

export default Form;
