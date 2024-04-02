import PropTypes from "prop-types";

const Options = ({ props }) => {
  const { options } = props;

  const handleOptionClicks = (e, onClick) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className="options">
      {options.map((option, index) => {
        const { optionName, onClick, icon } = option;
        return (
          <p
            className={optionName.match(/delete/i) ? "delete-option" : ""}
            onClick={(e) => handleOptionClicks(e, onClick)}
            key={index}
          >
            {icon ? <img src={icon} /> : ""}
            {optionName}
          </p>
        );
      })}
    </div>
  );
};

Options.propTypes = {
  props: PropTypes.object,
  options: PropTypes.array,
};

export default Options;
