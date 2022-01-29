import styles from './App.module.scss';
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
import KakaoAuthRedirect from './Auth/KakaoAuthRedirect';
import GoogleAuthRedirect from './Auth/GoogleAuthRedirect';
import { useEffect } from 'react';
import { useUserContext } from './UserContext';

function App() {
  const networkContext = useNetworkContext();
  const userContext = useUserContext();
  axios.defaults.baseURL = 'https://clonetwitter.shop/api/v1';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  useEffect(() => {
    userContext?.setUserData({
      ...userContext?.userData,
      userID: localStorage.user_id,
    });
  }, []);
  if (networkContext !== null) {
    axios.defaults.headers.common['Authorization'] =
      'JWT ' + networkContext.token;
  }
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
