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
  const userContext = useUserContext();
  const navigate = useNavigate();

  /*const switchToTweets = () => {
    props.setIsChosen('tweets');
    navigate(`/${params.id}`);
  };

  const switchToTweetsAndReplies = () => {
    props.setIsChosen('tweetsandreplies');
    navigate(`/${params.id}/with_replies`);
  };

  const switchToMedia = () => {
    props.setIsChosen('media');
    navigate(`/${params.id}/media`);
  };
  const switchToLikes = () => {
    props.setIsChosen('likes');
    navigate(`/${params.id}/likes`);
  };*/

  return (
    <div className={styles.SearchPage}>
      <header className={styles.SearchHeader}>Notifications</header>
      <div className={styles.Loading}>
        <h1>No Search</h1>
      </div>
      {/*<div className={styles.UserProfileRouterButtonWrapper}>
        {props.isChosen === 'tweets' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToTweets}
          >
            Top
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToTweets}
          >
            Latest
          </button>
        )}
        {props.isChosen === 'tweetsandreplies' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToTweetsAndReplies}
          >
            people
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToTweetsAndReplies}
          >
            Tweets & Replies
          </button>
        )}
        {props.isChosen === 'media' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToMedia}
          >
            Media
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToMedia}
          >
            Media
          </button>
        )}
        {props.isChosen === 'likes' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToLikes}
          >
            Likes
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToLikes}
          >
            Likes
          </button>
        )}
      </div>*/}
    </div>
  );
}

export default SearchPage;
