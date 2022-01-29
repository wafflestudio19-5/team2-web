import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile';
import Tweets from './Tweets/Tweets';
import TweetsAndReplies from './TweetsAndReplies/TweetsAndReplies';
import Media from './Media/Media';
import Likes from './Likes/Likes';
import styles from './ProfilePage.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../../../UserContext';
import { TweetData, UserData } from '../../../Reused/Tweet/Tweet';
import { MoonLoader } from 'react-spinners';

interface Props {
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
  loadNext: boolean;
}

const ProfilePage = ({
  loadNext,
  setLoadAgain,
  loadAgain,
}: Props): JSX.Element => {
  const [isChosen, setIsChosen] = useState<string>('tweets');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();

  const userContext = useUserContext();

  const [userData, setUserData] = useState<UserData>({
    username: '',
    user_id: '',
    bio: '',
    created_at: '',
    birth_date: '',
    i_follow: true,
    tweets: [
      {
        id: 0,
        tweet_type: '',
        author: {
          username: '',
          user_id: '',
          profile_img: '',
        },
        retweeting_user: '',
        reply_to: '',
        content: '',
        media: [],
        written_at: '',
        replies: 0,
        retweets: 0,
        likes: 0,
        user_like: false,
        user_retweet: false,
      },
    ],
    tweets_num: '',
    following: '',
    follower: '',
    profile_img: '',
    header_img: '',
  });

  const getUserProfile = async () => {
    setIsLoading(true);
    await axios
      .get(`/user/${params.id}`)
      .then(response => {
        console.log(response.data);
        setUserData(response.data);
        console.log(userData);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [month, setMonth] = useState('');
  const create_month = () => {
    switch (userData.created_at.slice(5, 7)) {
      case '01':
        setMonth('January');
        break;
      case '02':
        setMonth('February');
        break;
      case '03':
        setMonth('March');
        break;
      case '04':
        setMonth('April');
        break;
      case '05':
        setMonth('May');
        break;
      case '06':
        setMonth('June');
        break;
      case '07':
        setMonth('July');
        break;
      case '08':
        setMonth('August');
        break;
      case '09':
        setMonth('September');
        break;
      case '10':
        setMonth('October');
        break;
      case '11':
        setMonth('November');
        break;
      case '12':
        setMonth('December');
        break;
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [params.id, loadAgain]);

  useEffect(() => {
    create_month();
  }, [userData]);

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <MoonLoader color="#1c9bf0" size="40px" speedMultiplier={1} />
      </div>
    );
  }
  return (
    <div className={styles.ProfilePage}>
      <div>
        <UserProfile
          isChosen={isChosen}
          setIsChosen={setIsChosen}
          userData={userData}
          month={month}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Tweets
                setLoadAgain={setLoadAgain}
                loadAgain={loadAgain}
                loadNext={loadNext}
                userData={userData}
              />
            }
          />
          <Route
            path="/with_replies"
            element={
              <TweetsAndReplies
                setLoadAgain={setLoadAgain}
                loadAgain={loadAgain}
                loadNext={loadNext}
                userData={userData}
              />
            }
          />
          <Route
            path="/media"
            element={
              <Media
                setLoadAgain={setLoadAgain}
                loadAgain={loadAgain}
                loadNext={loadNext}
                userData={userData}
              />
            }
          />
          <Route
            path="/likes"
            element={
              <Likes
                setLoadAgain={setLoadAgain}
                loadAgain={loadAgain}
                loadNext={loadNext}
                userData={userData}
              />
            }
          />
        </Routes>
        <div className={styles.Footer}>
          [Waffle Studio 19.5 rookies | Team 2]
          <br />
          FrontEnd: 이승엽, 이하동, 이재민 / BackEnd: 전형민, 이서영, 고계훈
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
