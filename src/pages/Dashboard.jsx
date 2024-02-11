import Background from "../components/Background/Background";
import DashboardHeader from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../components/utils/hooks";
import styles from "./Pages.module.css";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Background />
      <DashboardHeader />
      <div className={styles.dashboardBody}>
      <Sidebar />
      <main className={styles.dashboardMain}>
        <div>Taskman collections: <span className={styles.collection}>New collection</span></div>
      </main>
      </div>
    </div>
  )
}

export default Dashboard;