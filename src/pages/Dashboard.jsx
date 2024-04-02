import { useState } from "react";
import Background from "../components/Background/Background";
import { DashboardNav } from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./Pages.module.css";
import Collections from "../components/Collections/Collections";
import ExamCounters from "../components/ExamCounter/ExamCounters";
import Statistics from "../components/Statistics/Statistics";
import MobileSideBarModal from "../components/Modals/MobileSideBarModal";

/**
 * Dashboard component.
 * Renders the main dashboard layout.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [showModal, setShowModal] = useState(false);

  const [displayTasksOptions, setDisplayTasksOptions] = useState({
    display: false,
    collection: null,
  });
  const mobileSidebarModalProps = {
    showModal: showModal,
    setShowModal: setShowModal,
    activeTab: activeTab,
    setActiveTab: setActiveTab,
  };

  const sideBarProps = {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
  };

  const collectionsProps = {
    displayTasksOptions: displayTasksOptions,
    setDisplayTasksOptions: setDisplayTasksOptions,
  };

  const tabs = {
    tasks: <Collections props={collectionsProps} />,
    examCounter: <ExamCounters />,
    statistics: <Statistics />,
  };

  return (
    <div className={styles.dashboard}>
      <Background />
      <DashboardNav />
      <div className={styles.dashboardBody}>
        <Sidebar props={sideBarProps} />
        <main className={styles.dashboardMain}>
          <MobileSideBarModal props={mobileSidebarModalProps} />
          {tabs[activeTab]}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
