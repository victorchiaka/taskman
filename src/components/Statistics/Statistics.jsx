import Chart from "chart.js/auto";
import DoughnutChart from "./DoughnutChart";
import { isTokenExpired } from "../utils/tokens";
import { useAuth } from "../utils/hooks";
import {
  getAllCollectionsRequest,
  refreshAccessTokenRequest,
} from "../../services/api";
import { useState, useEffect } from "react";
import StatisticsDropDown from "./StatisticsDropdown";

const Statistics = () => {
  const [collections, setCollections] = useState([]);
  const [data, setData] = useState([]);

  const auth = useAuth();

  let accessToken = localStorage.getItem("access_token");

  if (isTokenExpired(localStorage.getItem("access_token"))) {
    refreshAccessTokenRequest({
      refresh_token: localStorage.getItem("refresh_token"),
    }).then((res) => auth.login(res["tokens"]));
    accessToken = localStorage.getItem("access_token");
  }

  const handleGetAllCollections = () => {
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
