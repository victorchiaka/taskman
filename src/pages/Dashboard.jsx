import { useState } from "react";
import Background from "../components/Background/Background";
import DashboardHeader, { MobileNav } from "../components/Header/Header";
import Sidebar, { MobileSideBar } from "../components/Sidebar/Sidebar";
import styles from "./Pages.module.css";
import Collections from "../components/Collections/Collections";
import DashboardIcon from "@assets/dashboard.svg";
import Modal from "../components/Modal";

/**
 * Dashboard component.
 * Renders the main dashboard layout.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [active, setActive] = useState(false);

  const [openMobileNav, setOpenMobileNav] = useState(false);

  return (
    <div className={styles.dashboard}>
      <Background />
      <DashboardHeader setOpenMobileNav={setOpenMobileNav} />
      <MobileNav openMobileNav={openMobileNav} />
      <div className={styles.dashboardBody}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.mobileSideBarContainer}>
          <Modal setIsActive={setActive} isActive={active} >
            <MobileSideBar active={active} activeTab={activeTab} setActiveTab={setActiveTab} setActive={setActive} />
          </Modal>
        </div>
        <main className={styles.dashboardMain}>
          <div className={styles.sideBarTriggerContainer}>
            <img onClick={() => setActive(true)} src={DashboardIcon} className={styles.mobileSidebarTrigger}></img>
          </div>
          <Collections activeTab={activeTab} />
        </main>
      </div>
    </div>
  )
}


export default Dashboard;
