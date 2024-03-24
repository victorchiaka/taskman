import DashboardIcon from "@assets/dashboard.svg";
import { MobileSideBar } from "../Sidebar/Sidebar";
import Modal from "./Modal";
import PropTypes from "prop-types";

const MobileSideBarModal = ({ props }) => {
  const { showModal, setShowModal, activeTab, setActiveTab } = props;

  const handleToggleSidebar = () => {
    setShowModal(!showModal);
  };

  const mobileSideBarProps = {
    setShowModal: setShowModal,
    setActiveTab: setActiveTab,
    activeTab: activeTab,
    showModal: showModal,
  };

  const modalProps = {
    showModal,
    setShowModal,
    children: <MobileSideBar props={mobileSideBarProps} />,
  };

  return (
    <>
      <div className="dashboard-sidebar-trigger-container">
        <img onClick={() => handleToggleSidebar()} src={DashboardIcon}></img>
      </div>
      <Modal {...modalProps} />
    </>
  );
};

MobileSideBarModal.propTypes = {
  props: PropTypes.object,
  showModal: PropTypes.bool,
  activeTab: PropTypes.string,
  setShowModal: PropTypes.func,
  setActiveTab: PropTypes.func,
};

export default MobileSideBarModal;
