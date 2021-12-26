import styles from './LeftBlock.module.scss';
import React, { useState } from 'react';
import TweetModal from '../../Modal/TweetModal/TweetModal';

function LeftBlock() {
  const [isTweetModalOpen, setIsTweetModalOpen] = useState(false);

  const handleTweetClick = () => {
    setIsTweetModalOpen(!isTweetModalOpen);
  };

  return (
    <div className={styles.LeftBlock}>
      <header>
        <img />
      </header>
      <div className={styles.Home}>
        <img></img>
        Home
      </div>
      <div className={styles.Explore}>
        <img></img>
        Explore
      </div>
      <div className={styles.Notifications}>
        <img></img>
        Notifications
      </div>
      <div className={styles.Profile}>
        <img></img>
        Profile
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
