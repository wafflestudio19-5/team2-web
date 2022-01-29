import styles from './Trend.module.scss';
import { useNavigate } from 'react-router-dom';
import more from '../../../Images/more.svg';

function Trend(props: { text: string }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        window.location.href = '/search/?q=' + props.text;
      }}
      className={styles.TrendWrapper}
    >
      <div className={styles.TrendHeader}>
        <span className={styles.TrendHeaderText}>Trending in South Korea</span>
        <span>
          <img
            src={more}
            alt="no img"
            onClick={() => {
              console.log('setting');
            }}
          />
        </span>
      </div>
      <div className={styles.TrendContent}>{props.text}</div>
    </div>
  );
}

export default Trend;
