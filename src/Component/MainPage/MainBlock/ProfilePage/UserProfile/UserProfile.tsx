import React, { MouseEventHandler, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import EditProfileModal from '../../../../Modal/EditProfileModal/EditProfileModal';
import styles from './UserProfile.module.scss';

function UserProfile(props: any) {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    useState<boolean>(false);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };

  const switchToTweets = () => {
    props.setIsChosen('Tweets');
  };
  const switchToTweetsAndReplies = () => {
    props.setIsChosen('TweetsAndReplies');
  };
  const switchToMedia = () => {
    props.setIsChosen('Media');
  };
  const switchToLikes = () => {
    props.setIsChosen('Likes');
  };

  const navigate=useNavigate();

  return (
    <>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        setIsOpen={setIsEditProfileModalOpen}
      />
      <header className={styles.UserProfileHeader}>
        <button className={styles.UserProfileHeaderButton}>back</button>
        <div>
          <div className={styles.UserProfileHeaderName}>id.name</div>
          <div className={styles.UserProfileHeaderTweetsCount}>
            ($id.tweet.count)Tweets
          </div>
        </div>
      </header>
      <div className={styles.UserProfileBody}>
        <div />
        <div>
          <div>
            <img /> {/*profile img*/}
            <button onClick={handleEditProfileClick}>Edit profile</button>
          </div>
          <div>
            <p>id.name</p>
            <p>@id</p>
            <p>text</p>
            <p>join date</p>
            <p>($id.following.count)following ($id.follower.count)follower</p>
          </div>
        </div>
      </div>
      <button onClick={(switchToTweets)}>to Tweets</button>
      <button onClick={switchToTweetsAndReplies}>
        switchToTweetsAndReplies
      </button>
      <button onClick={switchToMedia}>switchToMedia</button>
      <button onClick={switchToLikes}>switchToLikes</button>
    </>
  );
}

export default UserProfile;
