import styles from './LeftBlock.module.scss';
import React from 'react';

function LeftBlock() {
  return <div className={styles.LeftBlock}>
    <header>
      <img/>
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
    <button className={styles.TweetButton}>
      Tweet
    </button>
  </div>;
}

export default LeftBlock;
