import { lazy, Suspense, useState } from "react";
import Background from "../components/Background/Background";
import { DashboardNav } from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./Pages.module.css";
import MobileSideBarModal from "../components/Modals/MobileSideBarModal";

const Collections = lazy(async () => await import("../components/Collections/Collections"));
const ExamCounters = lazy(async () =>
  await import("../components/ExamCounter/ExamCounters")
);
const Statistics = lazy(async () => await import("../components/Statistics/Statistics"));

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
          <Suspense>{tabs[activeTab]}</Suspense>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
