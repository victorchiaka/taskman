import Chart from "chart.js/auto";
import DoughnutChart from "./DoughnutChart";
import createTokenProvider from "../utils/tokens";
import { getAllCollectionsRequest } from "../../services/api";
import { useState, useEffect } from "react";
import StatisticsDropDown from "./StatisticsDropdown";

const Statistics = () => {
  const [collections, setCollections] = useState([]);
  const [data, setData] = useState([]);

  const { getToken } = createTokenProvider();

  const handleGetAllCollections = async () => {
    let accessToken = await getToken().then((res) => res);

    getAllCollectionsRequest(accessToken).then((res) => {
      setCollections(res.collections);
    });
  };

  const doughnutData = {
    completedCount: data.completed_count,
    uncompletedCount: data.uncompleted_count,
  };

  useEffect(() => {
    handleGetAllCollections();
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
