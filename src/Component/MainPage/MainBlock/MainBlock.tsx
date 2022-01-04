import styles from './MainBlock.module.scss';
import ProfilePage from './ProfilePage/ProfilePage';
import { Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';
import RightBlock from '../RightBlock/RightBlock';
import HomePage from './HomePage/HomePage';
function MainBlock() {
  return (
    <div className={styles.MainBlock}>
      {/*<ProfilePage />*/}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {/*<Route path="/notifications" component={NotificationsPage} exact />*/}
        <Route path="/:id/*" element={<ProfilePage />} />
        {/*<Route
                path="/*"
                element={<Navigate to="/home" />}
            />*/}
      </Routes>
      <RightBlock />
    </div>
  );
}

export default MainBlock;
