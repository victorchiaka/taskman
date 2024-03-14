import PropTypes from "prop-types";

const StatisticsDropDownOption = ({ collectionName }) => {
  return <option value={collectionName}>{collectionName}</option>;
};

StatisticsDropDownOption.propTypes = {
  collectionName: PropTypes.string,
};

export default StatisticsDropDownOption;
