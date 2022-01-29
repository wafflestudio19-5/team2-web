import styles from './App.module.scss';
//    "deploy": "aws s3 sync ./build s3://waffletwitter.shop --profile=ChrisLee02",
//    "invalidate": "aws cloudfront create-invalidation --profile=ChrisLee02 --distribution-id EK89KY4GVW9JF --paths / /index.html /error.html /service-worker.js /manifest.json /favicon.ico",

import * as React from 'react';
import {
  useNavigate,
  Route,
  BrowserRouter,
  Navigate,
  Routes,
} from 'react-router-dom';
import MainPage from './Component/MainPage/MainPage';
import LoginPage from './Component/LoginPage/LoginPage';

import axios from 'axios';
import { useNetworkContext } from './Auth/AuthContext';
import useEffect from 'react';
import KakaoAuthRedirect from './Auth/KakaoAuthRedirect';
import GoogleAuthRedirect from './Auth/GoogleAuthRedirect';
import { useUserContext } from './UserContext';
import { toast } from 'react-toastify';

function App() {
  const networkContext = useNetworkContext();
  const userContext = useUserContext();
  const logOut = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user_id');
    userContext?.setUserDataDefault();
    window.location.replace('/');
  };
  axios.defaults.baseURL = 'https://clonetwitter.shop/api/v1';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] =
    'JWT ' + networkContext?.token;
  React.useEffect(() => {
    userContext?.setUserData({
      ...userContext?.userData,
      userID: localStorage.user_id,
    });
    if (
      networkContext.token !== 'undefined' &&
      networkContext.token !== undefined
    ) {
      axios.get('/token/verify/').catch(error => {
        toast.error('토큰이 만료되었습니다.');
        logOut();
      });
    }
  }, []);
  if (
    networkContext.token === 'undefined' ||
    networkContext.token === undefined
  ) {
    //로그인 안 된 경우
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path={'/oauth/callback/kakao'}
              element={<KakaoAuthRedirect />}
            />
            <Route
              path={'/oauth/callback/google'}
              element={<GoogleAuthRedirect />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    //로그인 된 경우
    return (
      <div className={styles.App}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
