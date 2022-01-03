import styles from './LeftBlock.module.scss';
import React, { useState } from 'react';
import TweetModal from '../../Modal/TweetModal/TweetModal';
import setting from '../../../Images/setting.svg';
import profile_unclicked from '../../../Images/profile_unclicked.svg';
import notification_unclicked from '../../../Images/notification_unclicked.svg';
import home_unclicked from '../../../Images/home_unclicked.svg';
import explore_unclicked from '../../../Images/explore_unclicked.svg';
import logo_blue from '../../../Images/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg';
import more from '../../../Images/more.svg';
import tweetButtonSmall from '../../../Images/SimplifiedTweet.svg'
import { useLocation, useParams } from 'react-router-dom';


function LeftBlock() {
  const [isTweetModalOpen, setIsTweetModalOpen] = useState(false);

  const handleTweetClick = () => {
    setIsTweetModalOpen(!isTweetModalOpen);
  };


  return (
    <div className={styles.LeftBlock}>
      <div className={styles.NavigatorBlock}>
        <header className={styles.NavigatorHeader}>
          <img className={styles.NavigatorImg} src={logo_blue} width={30} height={30} alt="No img" />
        </header>
        <div className={styles.NavigatorWrapper}>
          <span className={styles.NavigatorButton}>
            <img className={styles.NavigatorImg} src={home_unclicked} width={30} height={30} alt="No img" />
            <div className={styles.NavigatorText} >Home</div>
          </span>
        </div>
        <div className={styles.NavigatorWrapper}>
          <span className={styles.NavigatorButton}>
            <img className={styles.NavigatorImg} src={explore_unclicked} width={30} height={30} alt="No img" />
            <div className={styles.NavigatorText} >Explore</div>
          </span>
        </div>
        <div className={styles.NavigatorWrapper}>
          <span className={styles.NavigatorButton}>
            <img className={styles.NavigatorImg} src={notification_unclicked} width={30} height={30} alt="No img" />
            <div className={styles.NavigatorText} >Notifications</div>
          </span>
        </div>
        <div className={styles.NavigatorWrapper}>
          <span className={styles.NavigatorButton}>
            <img className={styles.NavigatorImg} src={profile_unclicked} width={30} height={30} alt="No img" />
            <div className={styles.NavigatorText}>Profile</div>
          </span>
        </div>
        <div className={styles.NavigatorWrapper}>
          <span className={styles.NavigatorButton}>
            <img className={styles.NavigatorImg} src={setting} width={30} height={30} alt="No img" />
            <div className={styles.NavigatorText} >Setting</div>
          </span>
        </div>
        <button className={styles.TweetButton} onClick={handleTweetClick}>
          Tweet
        </button>
        <img className={styles.TweetButtonSmall} src={tweetButtonSmall} width={30} height={30} alt="No img" onClick={handleTweetClick}/>
        <TweetModal
          isTweetModalOpen={isTweetModalOpen}
          setIsTweetModalOpen={setIsTweetModalOpen}
        />
      </div>
      <div className={styles.ProfileBlock}>
        <div className={styles.ProfileWrapper}>
            <div className={styles.ProfileImgWrapper}>
              <img className={styles.ProfileImg} src={setting} width={30} height={30} alt="profile img" />
            </div>
            <div className={styles.ProfileTextWrapper}>
              <div className={styles.ProfileText}>id.name</div>
              <div className={styles.ProfileText}>@id</div>
            </div>
            <img className={styles.ProfileImgMore} src={more} alt="no img" />
        </div>
      </div>
    </div>
  );
}

export default LeftBlock;
