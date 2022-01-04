import styles from './App.module.scss';
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

function App() {

    const networkContext = useNetworkContext();

    
    axios.defaults.baseURL =
        "https://clonetwitter.shop/api/v1";
    axios.defaults.headers.post['Content-Type'] = "application/json"

    if(networkContext !== null){
        axios.defaults.headers.common["Authorization"] = "Bearer " + networkContext.token;
    }


  if (
    networkContext.token === "undefined" ||
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
