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
export const MobileSideBar = ({ activeTab, setActiveTab, setActive }) => {
  return (
    <section className={styles.mobileSideBar}>
      <div className={styles.sideBarTriggerContainer}>
        <img onClick={() => setActive(false)} src={DashboardIcon} className={styles.mobileSidebarTrigger}></img>
      </div>
      <div className={`${styles.sideBarChildren} ${activeTab === "tasks" ? styles.active : ""}`} onClick={() => setActiveTab("tasks")}>Tasks</div>
      <div className={`${styles.sideBarChildren} ${activeTab === "exam-counter" ? styles.active : ""}`} onClick={() => setActiveTab("exam-counter")}>Exam counter</div>
      <div className={`${styles.sideBarChildren} ${activeTab === "statistics" ? styles.active : ""}`} onClick={() => setActiveTab("statistics")}>Statistics</div>
    </section>
  );
}

/**
 * Sidebar component.
 * Renders the sidebar with clickable tabs.
 *
 * @param {Object} props - The component props.
 * @param {string} props.activeTab - The currently active tab.
 * @param {function} props.setActiveTab - The function to set the active tab.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <section className={styles.sideBar}>
        <div className={`${styles.sideBarChildren} ${activeTab === "tasks" ? styles.active : ""}`} onClick={() => setActiveTab("tasks")}>Tasks</div>
        <div className={`${styles.sideBarChildren} ${activeTab === "exam-counter" ? styles.active : ""}`} onClick={() => setActiveTab("exam-counter")}>Exam counter</div>
        <div className={`${styles.sideBarChildren} ${activeTab === "statistics" ? styles.active : ""}`} onClick={() => setActiveTab("statistics")}>Statistics</div>
      </section>
    </>
  )
}

MobileSideBar.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  setActive: PropTypes.func
}

Sidebar.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func
}

export default Sidebar;