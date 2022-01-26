import styles from './MainBlock.module.scss';
import ProfilePage from './ProfilePage/ProfilePage';
import { Route, Navigate, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NotificationsPage from './NotificationsPage/NotificationsPage';
import ExplorePage from './ExplorePage/ExplorePage';
import SettingPage from './SettingPage/SettingPage';
import FollowPage from './FollowPage/FollowPage';
import TweetPage from './TweetPage/TweetPage';
import SearchPage from './SearchPage/SearchPage';

interface Props {
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
  loadNext: boolean;
}

const MainBlock = ({ loadNext, setLoadAgain, loadAgain }: Props) => {
  return (
    <div className={styles.MainBlock}>
      <Routes>
        <Route
          path="/home"
          element={
            <HomePage
              setLoadAgain={setLoadAgain}
              loadAgain={loadAgain}
              loadNext={loadNext}
            />
          }
        />
        <Route path="/explore" element={<ExplorePage />} />
        <Route
          path="/search"
          element={
            <SearchPage
              loadNext={loadNext}
              setLoadAgain={setLoadAgain}
              loadAgain={loadAgain}
            />
          }
        />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route
          path="/:id/*"
          element={
            <ProfilePage
              setLoadAgain={setLoadAgain}
              loadAgain={loadAgain}
              loadNext={loadNext}
            />
          }
        />
        <Route
          path="/:id/following"
          element={
            <FollowPage
              setLoadAgain={setLoadAgain}
              loadAgain={loadAgain}
              loadNext={loadNext}
            />
          }
        />
        <Route
          path="/:id/followers"
          element={
            <FollowPage
              setLoadAgain={setLoadAgain}
              loadAgain={loadAgain}
              loadNext={loadNext}
            />
          }
        />
        <Route path="/setting/" element={<SettingPage />} />
        <Route
          path="/status/:tweet"
          element={
            <TweetPage setLoadAgain={setLoadAgain} loadAgain={loadAgain} />
          }
        />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
};

export default MainBlock;
