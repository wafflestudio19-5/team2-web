import styles from './App.module.scss';
import React from 'react';
import { Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';

import MainPage from './Component/MainPage/MainPage';
import LoginPage from './Component/LoginPage/LoginPage';

function App() {
  const testtest1 = "test";
  const testtest2 = "test";
  const testtest3 = "test";
  const testtest4 = "test";
  if (0) {
    //로그인 안 된 경우
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />{' '}
            {/*: <Navigate to={"/"}/> 가 element의 인자로 들어가야함.*/}
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    //로그인 된 경우
    return (
      <div className={styles.App}>
        <MainPage />
      </div>
    );
  }
}

export default App;
