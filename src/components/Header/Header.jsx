import styles from "./Header.module.css";

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

function DashboardHeader() {
  return (
    <header className={styles.dashboardHeader}>
      <h1 className={styles.dashboardTitle}>Taskman</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>Logout</li>
          <li>Delete Account</li>
        </ul>
      </nav>
    </header>
  )
}

export default DashboardHeader;
