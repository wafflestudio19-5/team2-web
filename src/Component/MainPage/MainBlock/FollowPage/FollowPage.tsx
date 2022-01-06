import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styles from './FollowPage.module.scss';
import arrow_left from '../../../../Images/arrow-left.svg';
import calendar from '../../../../../Images/calendar.svg';
import { useUserContext } from '../../../../UserContext';

function FollowPage() {
  const [isChosen, setIsChosen] = useState<string>('');
  const userContext = useUserContext();
  const navigate = useNavigate();
  const params = useParams();
  const loc = useLocation();

  console.log();

  useEffect(() => {
    if (
      loc.pathname.slice(
        'following' ? userContext.nowUserID.length + 2 : 0,
        'g' ? userContext.nowUserID.length + 11 : 0,
      ) === 'following'
    ) {
      setIsChosen('following');
    } else if (
      loc.pathname.slice(
        'follower' ? userContext.nowUserID.length + 2 : 0,
        'g' ? userContext.nowUserID.length + 11 : 0,
      ) === 'followers'
    ) {
      setIsChosen('followers');
    }
  });

  const switchToFollowing = () => {
    setIsChosen('following');
    navigate(`/${userContext.nowUserID}/following`);
  };
  const switchToFollowers = () => {
    setIsChosen('followers');
    navigate(`/${userContext.nowUserID}/followers`);
  };

  return (
    <>
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
          <div className={styles.UserProfileHeaderName}>id.name</div>
          <div className={styles.UserProfileHeaderID}>@user_id</div>
        </div>
      </header>

      <div className={styles.UserProfileRouterButtonWrapper}>
        {isChosen === 'followers' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToFollowers}
          >
            followers
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToFollowers}
          >
            followers
          </button>
        )}
        {isChosen === 'following' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToFollowing}
          >
            following
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToFollowing}
          >
            following
          </button>
        )}
      </div>
      <ul></ul>
    </>
  );
}

export default FollowPage;
