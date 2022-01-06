import React, { MouseEventHandler, useContext, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import EditProfileModal from '../../../../Modal/EditProfileModal/EditProfileModal';
import styles from './UserProfile.module.scss';
import arrow_left from '../../../../../Images/arrow-left.svg';
import calendar from '../../../../../Images/calendar.svg';
import { useUserContext } from '../../../../../UserContext';

function UserProfile(props: {isChosen : string
  setIsChosen: (value: string) => void }) {

  const userContext = useUserContext();
  const navigate = useNavigate();
  const params = useParams();

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    useState<boolean>(false);

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };

  const handleFollowClick = () =>{
    console.log('hi');
  }

  const switchToTweets = () => {
    props.setIsChosen('tweets');
    navigate(`/${userContext.nowUserID}`);
  };
  const switchToTweetsAndReplies = () => {
    props.setIsChosen('tweetsandreplies');
    navigate(`/${userContext.nowUserID}/with_replies`);
  };
  const switchToMedia = () => {
    props.setIsChosen('media');
    navigate(`/${userContext.nowUserID}/media`);
  };
  const switchToLikes = () => {
    props.setIsChosen('likes');
    navigate(`/${userContext.nowUserID}/likes`);
  };


  return (
    <>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        setIsOpen={setIsEditProfileModalOpen}
      />
      <header className={styles.UserProfileHeader}>
        <img
          className={styles.UserProfileHeaderButton}
          src={arrow_left}
          width={25}
          height={25}
          alt='back'
          onClick={() => { navigate(-1) }}
        />
        <div>
          <div className={styles.UserProfileHeaderName}>id.name</div>
          <div className={styles.UserProfileHeaderTweetsCount}>
            ($id.tweet.count)Tweets
          </div>
        </div>
      </header>
      <div className={styles.UserProfileBody}>
        <img
          className={styles.UserProfileBackground}
          src={arrow_left} alt='background'
        />
        <div className={styles.UserProfileBox}>
          <div className={styles.UserProfileBanner}>
            <img
              className={styles.UserProfileImg}
              src={arrow_left}
              alt='profileImg'
              width={140}
              height={140}
            />
            
              {params.id===localStorage.getItem("user_id") ?
               <button
               className={styles.UserProfileEditButton}
               onClick={handleEditProfileClick}>
                 Edit profile
              </button>
               :
               <button
               className={styles.UserProfileEditButton}
               onClick={handleFollowClick}>
                 Follow
              </button>
               }
          </div>
          <div className={styles.UserProfileInfoBox}>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bolder'
            }}
            >이재민/학생/컴퓨터공학부</div>
            <div style={{
              color: '#62717d'
            }}
            >@{params.id}</div>
            <div style={{
              marginTop: '20px',
            }}>text</div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              marginTop: '10px'
            }}>
              <img src={calendar} alt={calendar} width={20} height={20} />
              <div style={{
                marginLeft: '5px'
              }}>join date</div>
            </div>
            <div style={{
              marginTop: '10px'
            }}>
              <div onClick={()=>{navigate(`/${userContext.nowUserID}/following`)}}>
                ($id.following.count)following
              </div>
              <div onClick={()=>{navigate(`/${userContext.nowUserID}/followers`)}}>
                ($id.follower.count)follower
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.UserProfileRouterButtonWrapper}>
        {props.isChosen==='tweets' ?
        <button 
        className={styles.UserProfileRouterButtonClicked}
        onClick={(switchToTweets)}>
        Tweets
        </button>
        :
        <button 
          className={styles.UserProfileRouterButtonUnclicked}
          onClick={(switchToTweets)}>
        Tweets
        </button>}
        {props.isChosen==='tweetsandreplies' ?
        <button
        className={styles.UserProfileRouterButtonClicked}
        onClick={switchToTweetsAndReplies}>
          Tweets & Replies
        </button>
        :
        <button
        className={styles.UserProfileRouterButtonUnclicked}
        onClick={switchToTweetsAndReplies}>
          Tweets & Replies
        </button>}
        {props.isChosen==='media' ?
        <button 
          className={styles.UserProfileRouterButtonClicked}
        onClick={switchToMedia}>Media</button>
        :
        <button 
          className={styles.UserProfileRouterButtonUnclicked}
        onClick={switchToMedia}>Media</button>}
        {props.isChosen==='likes' ?
        <button 
          className={styles.UserProfileRouterButtonClicked}
          onClick={switchToLikes}>Likes</button>
        :
        <button 
          className={styles.UserProfileRouterButtonUnclicked}
          onClick={switchToLikes}>Likes</button>}
      </div>
      
    </>
  );
}

export default UserProfile;
