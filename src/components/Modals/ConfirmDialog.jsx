import PropTypes from "prop-types";
import Button from "../Button/Button";

const ConfirmDialog = ({ props }) => {
  const { actionHeader, actionDescription, actions } = props;

  return (
    <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
      <div className="dialog-info">
        <h4>{actionHeader}</h4>
        <p>{actionDescription}</p>
      </div>
      <div className="dialog-action">
        {actions.map((action) => (
          <Button {...action} key={action.type} />
        ))}
      </div>
    </div>
  );
};

ConfirmDialog.propTypes = {
  props: PropTypes.object,
  actionHeader: PropTypes.string,
  actionDescription: PropTypes.string,
  actions: PropTypes.array,
};

export default ConfirmDialog;
