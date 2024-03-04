import { useState, useEffect } from "react";
import Background from "../components/Background/Background";
import DashboardHeader, { MobileNav } from "../components/Header/Header";
import Sidebar, { MobileSideBar } from "../components/Sidebar/Sidebar";
import styles from "./Pages.module.css";
import Collections from "../components/Collections/Collections";
import DashboardIcon from "@assets/dashboard.svg";
import Modal from "../components/Modal";
import CollectionForm from "../components/Form/CollectionForm";
import { useToast } from "../components/utils/hooks";
import {
  createCollectionRequest,
  getAllCollectionsRequest,
  createTaskRequest,
  editCollectionRequest,
} from "../services/api";
import TaskForm from "../components/Form/TaskForm";

/**
 * Dashboard component.
 * Renders the main dashboard layout.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [active, setActive] = useState(false);
  const [taskFormActive, setTaskFormActive] = useState(false);
  const [isCollectionEdit, setIsCollectionEdit] = useState(false);
  const [collectionFormActive, setCollectionFormActive] = useState(false);
  const [activeCollection, setActiveCollection] = useState("");
  const [collections, setCollections] = useState([]);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const showToast = useToast();

  const [displayTasksOptions, setDisplayTasksOptions] = useState({
    display: false,
    collection: null,
  });

  const preventDefaultAction = (e) => {
    e.preventDefault();
  };

  const handleCreateCollection = (collectionData) => {
    createCollectionRequest(collectionData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const handleGetAllCollections = () => {
    getAllCollectionsRequest().then((res) => {
      setCollections(res.collections);
    });
  };

  const handleEditCollection = (collectionData) => {
    editCollectionRequest(collectionData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const handleCreateTask = (taskData) => {
    createTaskRequest(taskData)
      .then((res) => showToast.success(res["message"]))
      .catch((rej) => showToast.error(rej["message"]));
  };

  const mobileSidebarProps = {
    active: false,
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    setActive: setActive,
  };

  const sideBarProps = {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
  };

  const collectionProps = {
    collections: collections,
    setTaskFormActive: setTaskFormActive,
    setCollectionFormActive: setCollectionFormActive,
    setActiveCollection: setActiveCollection,
    displayTasksOptions: displayTasksOptions,
    setDisplayTasksOptions: setDisplayTasksOptions,
    isCollectionEdit: isCollectionEdit,
    setIsCollectionEdit: setIsCollectionEdit,
  };

  const taskFormProps = {
    setActive: setTaskFormActive,
    preventDefaultAction: preventDefaultAction,
    handleCreateTask: handleCreateTask,
    activeCollection: activeCollection,
  };

  const collectionFormProps = {
    setActive: setCollectionFormActive,
    preventDefaultAction: preventDefaultAction,
    handleCreateCollection: handleCreateCollection,
    isCollectionEdit: isCollectionEdit,
    setIsCollectionEdit: setIsCollectionEdit,
    activeCollection: activeCollection,
    setActiveCollection: setActiveCollection,
    handleEditCollection: handleEditCollection,
  };

  useEffect(() => {
    handleGetAllCollections();

    const interval = setInterval(() => {
      handleGetAllCollections();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dashboard}>
      <Background />
      <DashboardHeader setOpenMobileNav={setOpenMobileNav} />
      <MobileNav openMobileNav={openMobileNav} />
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
          <Collections props={collectionProps} />
        </main>
      </div>
      <Modal
        setIsActive={setCollectionFormActive}
        isActive={collectionFormActive}
        isForm={true}
      >
        <CollectionForm props={collectionFormProps} />
      </Modal>
      <Modal
        setIsActive={setTaskFormActive}
        isActive={taskFormActive}
        isForm={true}
      >
        <TaskForm props={taskFormProps} />
      </Modal>
    </div>
  );
}

export default Dashboard;
