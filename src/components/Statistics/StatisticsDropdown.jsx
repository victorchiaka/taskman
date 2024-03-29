import {
  getStatisticsRequest,
  refreshAccessTokenRequest,
} from "../../services/api";
import { isTokenExpired } from "../utils/tokens";
import PropTypes from "prop-types";
import { useToast, useAuth } from "../utils/hooks";
import StatisticsDropDownOption from "./StatisticsDropDownOption";

const StatisticsDropDown = ({ setData, collections }) => {
  const showToast = useToast();

  const auth = useAuth();

  let accessToken = localStorage.getItem("access_token");

  if (isTokenExpired(localStorage.getItem("access_token"))) {
    refreshAccessTokenRequest({
      refresh_token: localStorage.getItem("refresh_token"),
    }).then((res) => auth.login(res["tokens"]));
    accessToken = localStorage.getItem("access_token");
  }

  const handleGetStatistics = (collectionName) => {
    getStatisticsRequest(accessToken, { collection_name: collectionName })
      .then((res) => {
        setData(res["stats"]);
        showToast.success(res["message"]);
      })
      .catch((rej) => showToast.error(rej["message"]));
  };

  return (
    <select
      className="select-dropdown"
      onChange={(e) => handleGetStatistics(e.target.value)}
    >
      <option value="" hidden disabled selected>
        {" "}
        -- Select a Collection --
      </option>
      {collections.map((collection) => (
        <StatisticsDropDownOption
          key={collection.id}
          collectionName={collection.collection_name}
          handleGetStatistics={handleGetStatistics}
        />
      ))}
    </select>
  );
};

StatisticsDropDown.propTypes = {
  setData: PropTypes.func,
  collections: PropTypes.array,
};

export default StatisticsDropDown;
