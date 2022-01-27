import React from 'react';
import styles from './SearchPage.module.scss';
import ExternalStyles from '../ProfilePage/UserProfile/UserProfile.module.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Tweets from '../ProfilePage/Tweets/Tweets';
import TweetsAndReplies from '../ProfilePage/TweetsAndReplies/TweetsAndReplies';
import Media from '../ProfilePage/Media/Media';
import Likes from '../ProfilePage/Likes/Likes';
import { useUserContext } from '../../../../UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
function SearchPage() {

  return (
    <div className={styles.NotificationsPage}>
      <header className={styles.NotificationsHeader}>Search</header>
      <div className={styles.Loading}>
        <h1>No Search</h1>
      </div>
    </div>
  );
}

export default SearchPage;
