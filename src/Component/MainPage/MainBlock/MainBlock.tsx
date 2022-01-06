import React from 'react';
import styles from './MainBlock.module.scss';
import RightBlock from './RightBlock/RightBlock';
import ProfilePage from './ProfilePage/ProfilePage';
import { Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';
import Tweet from '../../Reused/Tweet/Tweet';
import HomePage from "./HomePage/HomePage";
import NotificationsPage from "./NotificationsPage/NotificationsPage";
import ExplorePage from "./ExplorePage/ExplorePage";
import SettingPage from "./SettingPage/SettingPage";

function MainBlock() {

  return (
    <div className={styles.MainBlock}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/:id/*" element={<ProfilePage />} />
        <Route path="/setting/" element={<SettingPage />} />
        <Route
                path="/*"
                element={<Navigate to="/home" />}/>
      </Routes>
      <RightBlock />
    </div>
  );
}

export default MainBlock;
