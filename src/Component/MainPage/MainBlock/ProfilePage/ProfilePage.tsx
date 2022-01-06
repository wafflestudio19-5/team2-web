import { Route, Routes, useParams } from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile';
import Tweets from './Tweets/Tweets';
import TweetsAndReplies from './TweetsAndReplies/TweetsAndReplies';
import Media from './Media/Media';
import Likes from './Likes/Likes';
import styles from './ProfilePage.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../../../UserContext';

interface Props {
  loadNext: boolean;
}

interface UserData {

  username: string
  user_id: string
  bio: string
  created_at: string
  birth_date: string
  tweets: string
  tweets_num: string
  following: string
  follower: string
}


const ProfilePage = ({ loadNext }: Props): JSX.Element => {
  const [isChosen, setIsChosen] = useState<string>('tweets');

  const params = useParams();


  const userContext = useUserContext();

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
  }
  );

  const getUserProfile = async () => {
    await axios
      .get(`/user/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        console.log(userData);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const [month, setMonth] = useState('');
  const create_month = () => {
    switch ((userData.created_at.slice(5, 7))) {
      case '01': setMonth('January'); break;
      case '02': setMonth('February'); break;
      case '03': setMonth('March'); break;
      case '04': setMonth('April'); break;
      case '05': setMonth('May'); break;
      case '06': setMonth('June'); break;
      case '07': setMonth('July'); break;
      case '08': setMonth('August'); break;
      case '09': setMonth('September'); break;
      case '10': setMonth('October'); break;
      case '11': setMonth('November'); break;
      case '12': setMonth('December'); break;
    }

  }

  useEffect(() => {
    getUserProfile();
    console.log(userData);
  }, [params.id])


  
  useEffect(() => {
    create_month();
  }, [userData])


  return (
    <div className={styles.ProfilePage}>
      <UserProfile isChosen={isChosen} setIsChosen={setIsChosen} userData={userData} month={month} />
      <Routes>
        <Route path="/" element={<Tweets loadNext={loadNext} />} />
        <Route
          path="/with_replies"
          element={<TweetsAndReplies loadNext={loadNext} />}
        />
        <Route path="/media" element={<Media loadNext={loadNext} />} />
        <Route path="/likes" element={<Likes loadNext={loadNext} />} />
      </Routes>
      <div className={styles.Footer}>Footer</div>
    </div>
  );
};

export default ProfilePage;
