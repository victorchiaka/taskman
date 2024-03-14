import Chart from "chart.js/auto";
import DoughnutChart from "./DoughnutChart";
import { getAllCollectionsRequest } from "../../services/api";
import { useState, useEffect } from "react";
import StatisticsDropDown from "./StatisticsDropdown";

const Statistics = () => {
  const [collections, setCollections] = useState([]);
  const jwtToken = localStorage.getItem("access_token");
  const [data, setData] = useState([]);

  const handleGetAllCollections = () => {
    getAllCollectionsRequest(jwtToken).then((res) => {
      setCollections(res.collections);
    });
  };

  const doughnutData = {
    completedCount: data.completed_count,
    uncompletedCount: data.uncompleted_count,
  };

  useEffect(() => {
    handleGetAllCollections();

    const interval = setInterval(() => {
      handleGetAllCollections();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="instance-action">
        <div>
          View your tasks statistics: &nbsp;
          <StatisticsDropDown setData={setData} collections={collections} />
        </div>
      </div>
      <div className="dashboard-contents-container statistics-dashboard">
        <DoughnutChart {...doughnutData} />
      </div>
    </>
  );
};

export default Statistics;
