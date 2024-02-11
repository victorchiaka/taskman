import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <section className={styles.sideBar}>
      <div className={styles.sideBarChildren}>Tasks</div>
      <div className={styles.sideBarChildren}>Exam counter</div>
      <div className={styles.sideBarChildren}>Statistics</div>
    </section>
  )
}

export default Sidebar;