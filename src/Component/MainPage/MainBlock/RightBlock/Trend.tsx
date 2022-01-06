import styles from './Trend.module.scss';
import more from '../../../../Images/more.svg';
import { useNavigate } from 'react-router-dom';

function Trend(props: { text: string }) {

  const navigate = useNavigate();

  return (
    <div className={styles.TrendWrapper}>
      <div className={styles.TrendHeader}>
        <span className={styles.TrendHeaderText}>Trending in South Korea</span>
        <span>
            <img src={more} alt="no img" onClick={()=>{console.log('setting')}}/>
        </span>
      </div>
      <div className={styles.TrendContent}>{props.text}</div>
    </div>
  );
}

export default Trend;
