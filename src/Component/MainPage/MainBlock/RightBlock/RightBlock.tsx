import styles from './RightBlock.module.scss';
import Magnifier from '../../../../Images/magnifier.svg';
import Setting from '../../../../Images/setting.svg';
import Trend from './Trend';
import Follow from './Follow';

function RightBlock() {
  return (
    <div className={styles.RightBlock}>
      <div className={styles.RightInside}>
        <form className={styles.SearchLabel} action="">
          <div className={styles.MagnifierWrapper}>
            <img
              className={styles.Magnifier}
              src={Magnifier}
              width={'20px'}
              height={'20px'}
              alt="no img"
            />
          </div>
          <input
            className={styles.SearchInput}
            placeholder="Search Twitter"
            type="text"
          />
        </form>
        <div className={styles.TrendsWrapper}>
          <div className={styles.TrendsInside}>
            <div className={styles.TrendHeader}>
              <span>Trends for you</span>
              <span className={styles.ButtonWrapper}>
                <a href="">
                  <img src={Setting} width={22} height={22} alt="No img" />
                </a>
              </span>
            </div>
            <Trend text={'Trend1'}></Trend>
            <Trend text={'Trend2'}></Trend>
            <Trend text={'Trend3'}></Trend>
            <Trend text={'Trend4'}></Trend>

            <button className={styles.TrendFooter}>
              <span className={styles.TrendFooterText}>Show more</span>
            </button>
          </div>
        </div>
        <div className={styles.WhoToFollowWrapper}>
          <div className={styles.WhoToFollowInside}>
            <div className={styles.WhoToFollowHeader}>
              <span>Who to follow</span>
            </div>
            <Follow id={'ABC'} name={'이이이'} img={Magnifier}></Follow>
            <Follow id={'ABC'} name={'이이이'} img={Magnifier}></Follow>
            <button className={styles.FollowFooter}>
              <span>Show more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBlock;
