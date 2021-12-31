import React from 'react';
import styles from './MainBlock.module.scss';
import RightBlock from './RightBlock/RightBlock';
import ProfilePage from './ProfilePage/ProfilePage';
import { Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';
import Tweet from '../../Reused/Tweet/Tweet';
function MainBlock() {
  return (
    <div className={styles.MainBlock}>
      {/*<ProfilePage />*/}
      <Routes>
        {/*<Route path="/home" component={HomePage} exact />
                    <Route path="/notifications" component={NotificationsPage} exact /> 요기는 나중에 구현.*/}
        <Route path="/:id" element={<ProfilePage />} />
      </Routes>
      <RightBlock />
    </div>
  );
}

export default MainBlock;
