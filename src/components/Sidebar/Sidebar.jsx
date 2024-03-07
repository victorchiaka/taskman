import styles from "./Sidebar.module.css";
import DashboardIcon from "@assets/dashboard.svg";
import PropTypes from "prop-types";

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
  const { active, activeTab, setActiveTab, setActive } = props;

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={`${styles.mobileSideBar} ${
        active ? styles.sideBarActive : ""
      }`}
    >
      <div className={styles.sideBarTriggerContainer}>
        <img
          onClick={() => setActive(false)}
          src={DashboardIcon}
          className={styles.mobileSidebarTrigger}
        ></img>
      </div>
      <div
        className={`${styles.sideBarChildren} ${
          activeTab === "tasks" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("tasks")}
      >
        Tasks
      </div>
      <div
        className={`${styles.sideBarChildren} ${
          activeTab === "examCounter" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("examCounter")}
      >
        Exam counter
      </div>
      <div
        className={`${styles.sideBarChildren} ${
          activeTab === "statistics" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("statistics")}
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
  const { activeTab, setActiveTab } = props;

  return (
    <>
      <section className={styles.sideBar}>
        <div
          className={`${styles.sideBarChildren} ${
            activeTab === "tasks" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </div>
        <div
          className={`${styles.sideBarChildren} ${
            activeTab === "examCounter" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("examCounter")}
        >
          Exam counter
        </div>
        <div
          className={`${styles.sideBarChildren} ${
            activeTab === "statistics" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("statistics")}
        >
          Statistics
        </div>
      </section>
    </>
  );
};

MobileSideBar.propTypes = {
  props: PropTypes.object,
  active: PropTypes.bool,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  setActive: PropTypes.func,
};

Sidebar.propTypes = {
  props: PropTypes.object,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default Sidebar;
