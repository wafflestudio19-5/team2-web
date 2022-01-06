import styles from './MainBlock.module.scss';
import ProfilePage from './ProfilePage/ProfilePage';
import { Route, Navigate, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NotificationsPage from './NotificationsPage/NotificationsPage';
import ExplorePage from './ExplorePage/ExplorePage';
import SettingPage from './SettingPage/SettingPage';
import FollowPage from './FollowPage/FollowPage';

function MainBlock() {
  return (
    <div className={styles.MainBlock}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/:id/*" element={<ProfilePage />} />
        <Route path="/:id/following" element={<FollowPage />} />
        <Route path="/:id/followers" element={<FollowPage />} />
        <Route path="/setting/" element={<SettingPage />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default MainBlock;
