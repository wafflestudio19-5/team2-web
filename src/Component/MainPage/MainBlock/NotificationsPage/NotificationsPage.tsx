import React from 'react';
import styles from './NotificationsPage.module.scss';
function NotificationsPage() {
  return (
    <div className={styles.NotificationsPage}>
      <header className={styles.NotificationsHeader}>Notifications</header>
      <div className={styles.Loading}>
        <h1>No Notifications</h1>
      </div>
    </div>
  );
}

export default NotificationsPage;
