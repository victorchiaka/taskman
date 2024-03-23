import { useState } from "react";
import Background from "../components/Background/Background";
import DashboardHeader, { MobileNav } from "../components/Header/Header";
import Sidebar, { MobileSideBar } from "../components/Sidebar/Sidebar";
import styles from "./Pages.module.css";
import Collections from "../components/Collections/Collections";
import DashboardIcon from "@assets/dashboard.svg";
import Modal from "../components/Modals/Modal";
import { useToast } from "../components/utils/hooks";
import {
  createExamCounterRequest,
} from "../services/api";
import ExamCounters from "../components/ExamCounter/ExamCounters";
import Statistics from "../components/Statistics/Statistics";
import DeleteAccountModal from "../components/Modals/DeleteAccountModal";
import ExamCounterModal from "../components/Modals/ExamCounterModal";

/**
 * Dashboard component.
 * Renders the main dashboard layout.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [active, setActive] = useState(false);

  const [toggleDeleteAcctountModal, setToggleDeleteAccountModal] =
    useState(false);

  const [examFormActive, setExamFormActive] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const showToast = useToast();

  const jwtToken = localStorage.getItem("access_token");

  const [displayTasksOptions, setDisplayTasksOptions] = useState({
    display: false,
    collection: null,
  });

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  const mobileSidebarProps = {
    active: false,
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    isActive: active,
    setActive: setActive,
  };

  const sideBarProps = {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
  };

  const collectionsProps = {
    displayTasksOptions: displayTasksOptions,
    setDisplayTasksOptions: setDisplayTasksOptions,
  };

  const examcounterProps = {
    setExamFormActive: setExamFormActive,
  };


  const handleCreateExamCounter = (examCounterData) => {
    createExamCounterRequest(jwtToken, examCounterData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const examCounterFormProps = {
    setActive: setExamFormActive,
    preventDefaultAction: preventDefaultAction,
    handleCreateExamCounter: handleCreateExamCounter,
  };

  const tabs = {
    tasks: <Collections props={collectionsProps} />,
    examCounter: <ExamCounters props={examcounterProps} />,
    statistics: <Statistics />,
  };

  const navProps = {
    setOpenMobileNav: setOpenMobileNav,
    toggleDeleteAcctountModal: toggleDeleteAcctountModal,
    setToggleDeleteAccountModal: setToggleDeleteAccountModal,
  };

  return (
    <div className={styles.dashboard}>
      <Background />
      <DashboardHeader {...navProps} />
      <MobileNav openMobileNav={openMobileNav} {...navProps} />
      <div className={styles.dashboardBody}>
        <Sidebar props={sideBarProps} />
        <div className={styles.mobileSideBarContainer}>
          <Modal setIsActive={setActive} isActive={active}>
            <MobileSideBar props={mobileSidebarProps} />
          </Modal>
        </div>
        <main className={styles.dashboardMain}>
          <div className={styles.sideBarTriggerContainer}>
            <img
              onClick={() => setActive(true)}
              src={DashboardIcon}
              className={styles.mobileSidebarTrigger}
            ></img>
          </div>
          {tabs[activeTab]}
        </main>
      </div>
      <ExamCounterModal
        setExamFormActive={setExamFormActive}
        examFormActive={examFormActive}
        examCounterFormProps={examCounterFormProps}
      />
      <DeleteAccountModal
        isActive={toggleDeleteAcctountModal}
        setIsActive={setToggleDeleteAccountModal}
      />
    </div>
  );
}

export default Dashboard;
