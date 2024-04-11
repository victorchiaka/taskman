import styles from "./Sidebar.module.css";
import DashboardIcon from "@assets/dashboard.svg";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { createAuthProvider } from "../utils/tokens";
import { useNavigate } from "react-router-dom";

/**
 * MobileSideBar component.
 * Renders the mobile sidebar with clickable tabs.
 *
 * @param {Object} props - The component props.
 * @param {string} props.activeTab - The currently active tab.
 * @param {function} props.setActiveTab - The function to set the active tab.
 * @param {function} props.setActive - The function to set the active state.
 * @returns {JSX.Element} The rendered MobileSideBar component.
 */
export const MobileSideBar = ({ props }) => {
  const { activeTab, showModal, setShowModal } = props;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const { getAuthenticatedUser } = createAuthProvider();

  const getUser = async () => {
    await getAuthenticatedUser().then((username) => {
      setUsername(username);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={`${styles.mobileSideBar} ${
        showModal ? styles.sideBarActive : ""
      }`}
    >
      <div className="sidebar-trigger-container">
        <img onClick={() => setShowModal(false)} src={DashboardIcon}></img>
      </div>
      <h3
        style={{
          marginBottom: "1rem",
        }}
      >
        <span>Hello, {username} 👋🏽</span>
      </h3>
      <div
        className={`${styles.sideBarChildren} ${
          activeTab === "tasks" ? styles.active : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        Tasks
      </div>
      <div
        className={`${styles.sideBarChildren} ${
          activeTab === "examCounter" ? styles.active : ""
        }`}
        onClick={() => navigate("/exam-counters")}
      >
        Exam counter
      </div>
      <div
        className={`${styles.sideBarChildren} ${
          activeTab === "statistics" ? styles.active : ""
        }`}
        onClick={() => navigate("/statistics")}
      >
        Statistics
      </div>
    </section>
  );
};

/**
 * Sidebar component.
 * Renders the sidebar with clickable tabs.
 *
 * @param {Object} props - The component props.
 * @param {string} props.activeTab - The currently active tab.
 * @param {function} props.setActiveTab - The function to set the active tab.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = ({ props }) => {
  const { activeTab } = props;
  const navigate = useNavigate();

  return (
    <>
      <section className={styles.sideBar}>
        <div
          className={`${styles.sideBarChildren} ${
            activeTab === "tasks" ? styles.active : ""
          }`}
          onClick={() => navigate("/dashboard")}
          >
          Tasks
        </div>
        <div
          className={`${styles.sideBarChildren} ${
            activeTab === "examCounter" ? styles.active : ""
          }`}
          onClick={() => navigate("/exam-counters")}
        >
          Exam counter
        </div>
        <div
          className={`${styles.sideBarChildren} ${
            activeTab === "statistics" ? styles.active : ""
          }`}
          onClick={() => navigate("/statistics")}
        >
          Statistics
        </div>
      </section>
    </>
  );
};

MobileSideBar.propTypes = {
  props: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

Sidebar.propTypes = {
  props: PropTypes.object,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default Sidebar;
