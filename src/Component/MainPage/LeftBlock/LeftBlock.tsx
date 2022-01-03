import styles from './LeftBlock.module.scss';
import React, { useState } from 'react';
import TweetModal from '../../Modal/TweetModal/TweetModal';
import setting from '../../../Images/setting.svg';
import profile_unclicked from '../../../Images/profile_unclicked.svg';
import notification_unclicked from '../../../Images/notification_unclicked.svg';
import home_unclicked from '../../../Images/home_unclicked.svg';
import explore_unclicked from '../../../Images/explore_unclicked.svg';
import logo_blue from '../../../Images/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg';


function LeftBlock() {
  const [isTweetModalOpen, setIsTweetModalOpen] = useState(false);

  const handleTweetClick = () => {
    setIsTweetModalOpen(!isTweetModalOpen);
  };

  return (
    <div className={styles.LeftBlock}>
      <header className={styles.NavigatorHeader}>
          <img className={styles.Navigator} src={logo_blue} width={30} height={30} alt="No img" />
      </header>
      <div className={styles.NavigatorWrapper}>
        <span className={styles.NavigatorButton}>
          <img className={styles.Navigator} src={home_unclicked} width={30} height={30} alt="No img" />
          <text className={styles.Navigator} >Home</text>
        </span>
      </div>
      <div className={styles.NavigatorWrapper}>
        <span className={styles.NavigatorButton}>
          <img className={styles.Navigator} src={explore_unclicked} width={30} height={30} alt="No img" />
          <text className={styles.Navigator} >Explore</text>
        </span>
      </div>
      <div className={styles.NavigatorWrapper}>
        <span className={styles.NavigatorButton}>
          <img className={styles.Navigator} src={notification_unclicked} width={30} height={30} alt="No img" />
          <text className={styles.Navigator} >Notifications</text>
        </span>
      </div>
      <div className={styles.NavigatorWrapper}>
        <span className={styles.NavigatorButton}>
          <img className={styles.Navigator} src={profile_unclicked} width={30} height={30} alt="No img" />
          <text className={styles.Navigator}>Profile</text>
        </span>
      </div>
      <div className={styles.NavigatorWrapper}>
        <span className={styles.NavigatorButton}>
          <img className={styles.Navigator} src={setting} width={30} height={30} alt="No img" />
          <text className={styles.Navigator} >Setting</text>
        </span>
      </div>
      <button className={styles.TweetButton} onClick={handleTweetClick}>
        Tweet
      </button>
      <TweetModal
        isTweetModalOpen={isTweetModalOpen}
        setIsTweetModalOpen={setIsTweetModalOpen}
      />
    </div>
  );
}

export default LeftBlock;
