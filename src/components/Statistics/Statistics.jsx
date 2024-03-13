import Chart from "chart.js/auto";
import jsonData from "./data.json";
import DoughnutChart from "./DoughnutChart";

const StatisticsDropDown = () => {
  return (
    <select className="select-dropdown">
      <option value="" hidden disabled selected>
        {" "}
        -- Select a Collection --
      </option>
      <option value="goals">Goals</option>
      <option value="software-engineers">Software engineers</option>
      <option value="school-related-goals">School related goals</option>
      <option value="self-improvement">Self improvement</option>
    </select>
  );
};

const Statistics = () => {
  const doughnutData = {
    completedTasks: jsonData.completed_tasks,
    uncompletedTasks: jsonData.uncompleted_tasks,
  };

  return (
    <>
      <div className="instance-action">
        <div>
          View your tasks statistics: &nbsp;
          <StatisticsDropDown />
        </div>
      </div>
      <DoughnutChart {...doughnutData} />
    </>
  );
};

export default Statistics;
