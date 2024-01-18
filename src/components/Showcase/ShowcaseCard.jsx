import styles from "./Showcase.module.css";
import PropTypes from "prop-types";

function ShowcaseCard(props) {
  return (
    <div className={styles.showcaseCard}>
      <h4 className={styles.cardTitle}>{props.title}</h4>
      <img className={styles.img} src={props.url}></img>
      <small className={styles.cardInfo}>{props.info}</small>
    </div>
  );
}

ShowcaseCard.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  info: PropTypes.string,
};

export default ShowcaseCard;
