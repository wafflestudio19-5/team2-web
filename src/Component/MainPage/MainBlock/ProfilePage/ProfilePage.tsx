import styles from './ProfilePage.module.scss';
import UserProfile from './UserProfile/UserProfile';
import Tweets from './Tweets/Tweets';
import TweetsAndReplies from './TweetsAndReplies/TweetsAndReplies';
import Media from './Media/Media';
import Likes from './Likes/Likes';
import { useState } from 'react';
import { Route, Routes } from 'react-router';

interface Props {
  loadNext: boolean;
}

const ProfilePage = ({ loadNext }: Props): JSX.Element => {
  const [isChosen, setIsChosen] = useState<string>('tweets');
  return (
    <div className={styles.ProfilePage}>
      <UserProfile isChosen={isChosen} setIsChosen={setIsChosen} />
      <Routes>
        <Route path="/" element={<Tweets loadNext={loadNext} />} />
        <Route
          path="/with_replies"
          element={<TweetsAndReplies loadNext={loadNext} />}
        />
        <Route path="/media" element={<Media loadNext={loadNext} />} />
        <Route path="/likes" element={<Likes loadNext={loadNext} />} />
      </Routes>
    </div>
  );
};

export default ProfilePage;
