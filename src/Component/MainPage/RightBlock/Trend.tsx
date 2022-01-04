import styles from './Trend.module.scss';
import more from '../../../Images/more.svg';

function Trend(props: { text: string }) {
  return (
    <div className={styles.TrendWrapper}>
      <div className={styles.TrendHeader}>
        <span className={styles.TrendHeaderText}>Trending in South Korea</span>
        <span>
          <a href="">
            <img src={more} alt="no img" />
          </a>
        </span>
      </div>
      <div className={styles.TrendContent}>{props.text}</div>
    </div>
  );
}

export default Trend;
