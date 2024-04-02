import { useState } from "react";
import styles from "./Header.module.css";
import PropTypes from "prop-types";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import LogoutModal from "../Modals/LogoutModal";

/**
 * HomeHeader component.
 * Renders the header for the home page.
 *
 * @returns {JSX.Element} The rendered HomeHeader component.
 */

const actions = {
  DELETE_ACCOUNT: "deleteAccount",
  LOGOUT: "logout",
  GO_HOME: "goHome",
  NONE: "",
};

export function HomeHeader() {
  return (
    <header className={styles.homeHeader}>
      <h1 className={styles.title}>Taskman</h1>
      <p className={styles.homeHeaderIntro}>
        Create, manage and track your <span>Tasks</span> with ease.
      </p>
    </header>
  );
}

/**
 * DesktopNav component.
 * Renders the navigation menu for larger screens.
 *
 * @returns {JSX.Element} The rendered DesktopNav component.
 */
function DesktopNav({ setShowModal, setAction }) {
  return (
    <nav className={styles.desktopNav}>
      <ul>
        <li
          onClick={() => {
            setShowModal(true);
            setAction(actions.GO_HOME);
          }}
        >
          Home
        </li>
        <li
          onClick={() => {
            setShowModal(true);
            setAction(actions.LOGOUT);
          }}
        >
          Logout
        </li>
        <li
          onClick={() => {
            setShowModal(true);
            setAction(actions.DELETE_ACCOUNT);
          }}
        >
          Delete Account
        </li>
      </ul>
    </nav>
  );
}

/**
 * MobileNav component.
 * Renders the navigation menu for smaller (Mobile) screens.
 *
 * @returns {JSX.Element} The rendered DesktopNav component.
 */
// export function MobileNav({ openMobileNav, showModal, setShowModal, setAction }) {
export function MobileNav({ openMobileNav, setAction, setShowModal }) {
  return (
    <>
      {openMobileNav ? (
        <ul className={styles.mobileNav}>
          <li
            onClick={() => {
              setShowModal(true);
              setAction(actions.GO_HOME);
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              setShowModal(true);
              setAction(actions.LOGOUT);
            }}
          >
            Logout
          </li>
          <li
            onClick={() => {
              setShowModal(true);
              setAction(actions.DELETE_ACCOUNT);
            }}
          >
            Delete Account
          </li>
        </ul>
      ) : null}
    </>
  );
}

/**
 * Hamburger component.
 * Responsible for toggline the MobileNav component.
 *
 * @returns {JSX.Element} The rendered DesktopNav component.
 */

function Hamburger({ setOpenMobileNav }) {
  const [openHamburger, setOpenHamburger] = useState(false);

  const handleOnclick = () => {
    setOpenHamburger(!openHamburger);
    setOpenMobileNav(!openHamburger);
  };

  return (
    <button
      onClick={handleOnclick}
      className={`${styles.hamburger} ${openHamburger ? styles.open : ""}`}
    >
      <div className={styles.hamburgerStroke}></div>
      <div className={styles.hamburgerStroke}></div>
      <div className={styles.hamburgerStroke}></div>
    </button>
  );
}

/**
 * DashboardHeader component.
 * Renders the header for the dashboard.
 *
 * @returns {JSX.Element} The rendered DashboardHeader component.
 */
function DashboardHeader({ setShowModal, setOpenMobileNav, setAction }) {
  return (
    <header className={styles.dashboardHeader}>
      <h1 className={styles.dashboardTitle}>Taskman</h1>
      <DesktopNav setAction={setAction} setShowModal={setShowModal} />
      <Hamburger setOpenMobileNav={setOpenMobileNav} />
    </header>
  );
}

export function DashboardNav() {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [action, setAction] = useState(actions.NONE);

  return (
    <>
      {action === actions.DELETE_ACCOUNT ? (
        <DeleteAccountModal showModal={showModal} setShowModal={setShowModal} />
      ) : action === actions.LOGOUT ? (
        <LogoutModal showModal={showModal} setShowModal={setShowModal} />
      ) : null}
      <DashboardHeader
        setOpenMobileNav={setOpenMobileNav}
        showModal={showModal}
        setShowModal={setShowModal}
        setAction={setAction}
      />
      <MobileNav
        openMobileNav={openMobileNav}
        setShowModal={setShowModal}
        setAction={setAction}
      />
    </>
  );
}

MobileNav.propTypes = {
  setShowModal: PropTypes.func,
  openMobileNav: PropTypes.bool,
  setAction: PropTypes.func,
};

DesktopNav.propTypes = {
  setAction: PropTypes.func,
  setShowModal: PropTypes.func,
};

Hamburger.propTypes = {
  setOpenMobileNav: PropTypes.func,
};

DashboardHeader.propTypes = {
  setAction: PropTypes.func,
  setShowModal: PropTypes.func,
  setOpenMobileNav: PropTypes.func,
};

export default DashboardHeader;
