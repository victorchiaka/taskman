import PropTypes from "prop-types";

const Options = ({ options }) => {
  return (
    <div className="options">
      {options.map((option, key) => {
        return (
          <p onClick={(e) => e.stopPropagation()} key={key}>
            {option}
          </p>
        );
      })}
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.array,
};

export default Options;
