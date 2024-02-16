import { useState } from "react";
import styles from "./Header.module.css";
import PropTypes from "prop-types";

/**
 * HomeHeader component.
 * Renders the header for the home page.
 *
 * @returns {JSX.Element} The rendered HomeHeader component.
 */
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
function DesktopNav() {
  return (
    <nav className={styles.desktopNav}>
      <ul>
        <li>Home</li>
        <li>Logout</li>
        <li>Delete Account</li>
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
export function MobileNav({ openMobileNav }) {
  return (
    <>
      {openMobileNav ? (
        <ul className={styles.mobileNav}>
          <li>Home</li>
          <li>Logout</li>
          <li>Delete Account</li>
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
  }

  return (
    <button onClick={handleOnclick} className={`${styles.hamburger} ${openHamburger ? styles.open : ""}`}>
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
function DashboardHeader({ setOpenMobileNav }) {
  return (
    <header className={styles.dashboardHeader}>
      <h1 className={styles.dashboardTitle}>Taskman</h1>
      <DesktopNav />
      <Hamburger setOpenMobileNav={setOpenMobileNav} />
    </header>
  )
}

MobileNav.propTypes = {
  openMobileNav: PropTypes.bool
}

Hamburger.propTypes = {
  setOpenMobileNav: PropTypes.func
}

DashboardHeader.propTypes = {
  setOpenMobileNav: PropTypes.func
}

export default DashboardHeader;
