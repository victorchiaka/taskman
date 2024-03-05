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
        return (
          <p onClick={(e) => handleOptionClicks(e, option.onClick)} key={index}>
            {option.optionName}
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
