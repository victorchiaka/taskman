import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";

const DoughnutChart = ({ completedCount, uncompletedCount }) => {
  const data = {
    labels: ["Completed Tasks", "Uncompleted Tasks"],
    datasets: [
      {
        data: [completedCount, uncompletedCount],
        backgroundColor: ["#36A2EB", "#b91d47"],
        hoverBackgroundColor: ["#36A2EB", "#b91d47"],
      },
    ],
  };

  const style = {
    Width: "15rem",
    Height: "15rem",
    minWidth: "11rem",
    minHeight: "11rem",
  };

  return (
    <div className="chart-container">
      <Doughnut style={style} data={data} />
    </div>
  );
};

DoughnutChart.propTypes = {
  completedCount: PropTypes.number,
  uncompletedCount: PropTypes.number,
};

export default DoughnutChart;
