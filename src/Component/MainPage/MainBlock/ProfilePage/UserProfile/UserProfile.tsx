import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import EditProfileModal from '../../../../Modal/EditProfileModal/EditProfileModal';
import styles from './UserProfile.module.scss';
import arrow_left from '../../../../../Images/arrow-left.svg';
import calendar from '../../../../../Images/calendar.svg';
import { useUserContext } from '../../../../../UserContext';
import { TweetData, UserData } from '../../../../Reused/Tweet/Tweet';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserProfile(props: {
  isChosen: string;
  setIsChosen: (value: string) => void;
  userData: UserData;
  month: string;
}) {
  const userContext = useUserContext();
  const navigate = useNavigate();
  const params = useParams();
  const [following, setFollowing] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] =
    useState<boolean>(false);
  const unfollow = () => {
    axios
      .delete('/unfollow/' + props.userData.user_id)
      .then(() => {
        setFollowing(false);
        setIsOpen(false);
      })
      .catch(() => {
        toast.error('언팔로우 요청 실패');
      });
  };

  useEffect(() => {
    setFollowing(props.userData.i_follow);
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };

  const handleFollowClick = () => {
    axios
      .post('/follow/', { user_id: params.id })
      .then(() => {
        setFollowing(true);
      })
      .catch(() => {
        toast.error('팔로우 요청 실패');
      });
  };

  const switchToTweets = () => {
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
  };

  return (
    <>
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        setIsOpen={setIsEditProfileModalOpen}
      />
      <Modal
        ariaHideApp={false}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
          content: {
            fontWeight: '600',
            position: 'absolute',
            top: 'calc(50% - 150px)',
            left: 'calc(50% - 170px)',
            right: 'calc(50% - 170px)',
            bottom: 'calc(50% - 150px)',
            border: '1px solid #ccc',
            borderRadius: '20px',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            outline: 'none',
            padding: '20px 30px 20px 30px',
          },
        }}
        isOpen={isOpen}
      >
        <header> Unfollow @{props.userData.user_id}?</header>
        <br />
        <br />
        <div>
          Their Tweets will no longer show up in your home timeline. You can
          still view their profile, unless their Tweets are protected.
        </div>
        <br />
        <footer>
          <div>
            <button
              onClick={e => {
                e.stopPropagation();
                unfollow();
              }}
              className={styles.UnfollowButton}
            >
              UnFollow
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className={styles.CancelButton}
            >
              Cancel
            </button>
          </div>
        </footer>
      </Modal>
      <header className={styles.UserProfileHeader}>
        <img
          className={styles.UserProfileHeaderButton}
          src={arrow_left}
          width={25}
          height={25}
          alt="back"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div>
          <div className={styles.UserProfileHeaderName}>
            {props.userData.username}
          </div>
          <div className={styles.UserProfileHeaderTweetsCount}>
            {props.userData.tweets_num} Tweets
          </div>
        </div>
      </header>
      <div className={styles.UserProfileBody}>
        <div className={styles.UserProfileBackground}>
          {props.userData.header_img ? (
            <img
              className={styles.UserProfileBackgroundImg}
              src={props.userData.header_img}
              alt="background"
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className={styles.UserProfileBox}>
          <div className={styles.UserProfileBanner}>
            <img
              className={styles.UserProfileImg}
              src={props.userData.profile_img}
              alt="profileImg"
              width={140}
              height={140}
            />

            {params.id === localStorage.getItem('user_id') ? (
              <button
                className={styles.UserProfileEditButton}
                onClick={handleEditProfileClick}
              >
                Edit profile
              </button>
            ) : !following ? (
              <button
                className={styles.FollowButton}
                onClick={handleFollowClick}
              >
                Follow
              </button>
            ) : (
              <button
                className={styles.FollowingButton}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Following
              </button>
            )}
          </div>
          <div className={styles.UserProfileInfoBox}>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bolder',
              }}
            >
              {props.userData.username}
            </div>
            <div>
              <div
                style={{
                  color: '#62717d',
                }}
              >
                @{params.id}
              </div>
            </div>

            <div
              style={{
                marginTop: '20px',
              }}
            >
              {props.userData.bio}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                marginTop: '10px',
              }}
            >
              <img src={calendar} alt={calendar} width={20} height={20} />
              <div
                style={{
                  marginLeft: '5px',
                  color: '#586875',
                }}
              >
                Joined {props.month ? props.month : ''}{' '}
                {props.userData.created_at.slice(0, 4)}
              </div>
            </div>
            <div
              style={{
                marginTop: '10px',
                display: 'flex',
              }}
            >
              <div
                onClick={() => {
                  navigate(`/${params.id}/following`);
                }}
                className={styles.UserFollowNumberButton}
              >
                <span
                  style={{
                    fontWeight: 'bolder',
                  }}
                >
                  {props.userData.following}
                </span>
                &nbsp;
                <div
                  style={{
                    color: '#586875',
                  }}
                >
                  Following
                </div>
              </div>
              <div
                onClick={() => {
                  navigate(`/${params.id}/followers`);
                }}
                style={{
                  marginLeft: '10px',
                }}
                className={styles.UserFollowNumberButton}
              >
                <span
                  style={{
                    fontWeight: 'bolder',
                  }}
                >
                  {props.userData.follower}
                </span>
                &nbsp;
                <div
                  style={{
                    color: '#586875',
                  }}
                >
                  Follower
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.UserProfileRouterButtonWrapper}>
        {props.isChosen === 'tweets' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToTweets}
          >
            Tweets
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToTweets}
          >
            Tweets
          </button>
        )}
        {props.isChosen === 'tweetsandreplies' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToTweetsAndReplies}
          >
            Tweets & Replies
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
      </div>
    </>
  );
}

export default UserProfile;
