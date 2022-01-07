import React from 'react';
import styles from './TweetPage.module.scss';

function TweetPage() {
  return (
    <div className={styles.TweetPage}>
      <header className={styles.TweetHeader}>Thread</header>
      <div className={styles.TweetBody}>
        <h1>Tweet</h1>
      </div>
    </div>
  );
}

export default TweetPage;
