import styles from './LeftBlock.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import TweetModal from '../../Modal/TweetModal/TweetModal';
import setting from '../../../Images/setting.svg';
import setting_clicked from '../../../Images/setting_clicked.svg';
import profile_unclicked from '../../../Images/profile_unclicked.svg';
import profile_clicked from '../../../Images/profile_clicked.svg';
import notification_unclicked from '../../../Images/notification_unclicked.svg';
import notification_clicked from '../../../Images/notification_clicked.svg';
import home_unclicked from '../../../Images/home_unclicked.svg';
import home_clicked from '../../../Images/home_clicked.svg';
import explore_unclicked from '../../../Images/explore_unclicked.svg';
import explore_clicked from '../../../Images/explore_clicked.svg';
import logo from '../../../Images/waffleTwitterIcon.png';
import more from '../../../Images/more.svg';
import tweetButtonSmall from '../../../Images/SimplifiedTweet.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../../UserContext';
import axios from 'axios';

interface UserData {
  username: string;
  user_id: string;
  bio: string;
  created_at: string;
  birth_date: string;
  tweets: string;
  tweets_num: string;
  following: string;
  follower: string;
  profile_img: string;
}
interface Props {
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
}

function LeftBlock({ loadAgain, setLoadAgain }: Props) {
  const params = useParams();
  const loc = useLocation();
  const navigate = useNavigate();
  const userContext = useUserContext();
  const [isTweetModalOpen, setIsTweetModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [whichNavigatorClicked, setWhichNavigatorClicked] = useState('home');
  const [userData, setUserData] = useState<UserData>({
    username: '',
    user_id: userContext.nowUserID,
    bio: '',
    created_at: '',
    birth_date: '',
    tweets: '',
    tweets_num: '',
    following: '',
    follower: '',
    profile_img: '',
  });

  const getUserProfile = async () => {
    await axios
      .get(`/user/${localStorage.user_id}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (params.id !== localStorage.getItem('user_id')) {
      setWhichNavigatorClicked('');
    }
    getUserProfile();
  }, [loadAgain]);

  const handleTweetClick = () => {
    setIsTweetModalOpen(!isTweetModalOpen);
  };

  const logoutModalToggle = () => {
    if (isLogoutModalOpen) {
      setIsLogoutModalOpen(false);
    } else {
      setIsLogoutModalOpen(true);
    }
  };

  const logOut = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user_id');
    console.log('logout');
    window.location.replace('/');
    userContext.setNowUserID('undefined');
    setIsLogoutModalOpen(false);
  };

  const SocialLogout = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user_id');
    console.log('logout');
    window.location.replace('/');
    userContext.setNowUserID('undefined');
    setIsLogoutModalOpen(false);
  };

  const HomeClicked = () => {
    navigate('/home');
    setWhichNavigatorClicked('home');
  };

  const ExploreClicked = () => {
    navigate('/explore');
    setWhichNavigatorClicked('explore');
  };

  const NotificationsClicked = () => {
    navigate('/notifications');
    setWhichNavigatorClicked('notifications');
  };

  const ProfileClicked = () => {
    navigate(`/${userContext.nowUserID}`);
    setWhichNavigatorClicked('profile');
  };

  const SettingClicked = () => {
    navigate('/setting');
    setWhichNavigatorClicked('setting');
  };

  return (
    <div className={styles.LeftBlock}>
      <div className={styles.NavigatorBlock}>
        <header className={styles.NavigatorHeader}>
          <img
            className={styles.NavigatorHeaderImg}
            src={logo}
            width={45}
            height={45}
            alt="No img"
            onClick={() => navigate('/home')}
          />
        </header>
        <div className={styles.NavigatorWrapper} onClick={HomeClicked}>
          {whichNavigatorClicked === 'home' ? (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={home_clicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorTextBolder}>Home</div>
            </span>
          ) : (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={home_unclicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorText}>Home</div>
            </span>
          )}
        </div>
        <div className={styles.NavigatorWrapper} onClick={ExploreClicked}>
          {whichNavigatorClicked === 'explore' ? (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={explore_clicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorTextBolder}>Explore</div>
            </span>
          ) : (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={explore_unclicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorText}>Explore</div>
            </span>
          )}
        </div>
        <div className={styles.NavigatorWrapper} onClick={NotificationsClicked}>
          {whichNavigatorClicked === 'notifications' ? (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={notification_clicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorTextBolder}>Notifications</div>
            </span>
          ) : (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={notification_unclicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorText}>Notifications</div>
            </span>
          )}
        </div>
        <div className={styles.NavigatorWrapper} onClick={ProfileClicked}>
          {whichNavigatorClicked === 'profile' ? (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={profile_clicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorTextBolder}>Profile</div>
            </span>
          ) : (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={profile_unclicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorText}>Profile</div>
            </span>
          )}
        </div>
        <div className={styles.NavigatorWrapper} onClick={SettingClicked}>
          {whichNavigatorClicked === 'setting' ? (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={setting_clicked}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorTextBolder}>Setting</div>
            </span>
          ) : (
            <span className={styles.NavigatorButton}>
              <img
                className={styles.NavigatorImg}
                src={setting}
                width={30}
                height={30}
                alt="No img"
              />
              <div className={styles.NavigatorText}>Setting</div>
            </span>
          )}
        </div>
        <button className={styles.TweetButton} onClick={handleTweetClick}>
          Tweet
        </button>
        <img
          className={styles.TweetButtonSmall}
          src={tweetButtonSmall}
          width={30}
          height={30}
          alt="No img"
          onClick={handleTweetClick}
        />
        <TweetModal
          loadAgain={loadAgain}
          setLoadAgain={setLoadAgain}
          isTweetModalOpen={isTweetModalOpen}
          setIsTweetModalOpen={setIsTweetModalOpen}
        />
      </div>
      {isLogoutModalOpen ? (
        <div className={styles.LogoutModalWrapper}>
          <div className={styles.LogoutModal} onClick={logOut}>
            Logout {userContext.nowUserID}
          </div>
          {/*<div className={styles.SocialLogoutModal} onClick={SocialLogout}>
            Social Logout {userContext.nowUserID}
          </div>*/}
        </div>
      ) : null}
      <button className={styles.ProfileBlock} onClick={logoutModalToggle}>
        <div className={styles.ProfileWrapper}>
          <div className={styles.ProfileImgWrapper}>
            <img
              className={styles.ProfileImg}
              src={userData.profile_img}
              alt="profile img"
            />
          </div>
          <div className={styles.ProfileTextWrapper}>
            <div className={styles.ProfileText}>{userData.username}</div>
            <div className={styles.ProfileText}>@{userData.user_id}</div>
          </div>
          <img className={styles.ProfileImgMore} src={more} alt="no img" />
        </div>
      </button>
    </div>
  );
}

export default LeftBlock;
