import React from 'react';
import styles from './ExplorePage.module.scss';
function ExplorePage() {
  return (
    <div className={styles.ExplorePage}>
      <header className={styles.ExploreHeader}>Explore</header>
      <h1 className={styles.Loading}>Nothing to Search</h1>
    </div>
  );
}

export default ExplorePage;
