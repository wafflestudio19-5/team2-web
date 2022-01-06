import React, { useContext } from 'react';

import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { useNetworkContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserContext } from '../UserContext';

function KakaoAuthRedirect() {
  const userContext = useUserContext();
  const Navigate = useNavigate();
  const networkContext = useNetworkContext();
  const code = new URL(window.location.href).searchParams.get('code');
  const user_id = new URL(window.location.href).searchParams.get('user_id');
  React.useEffect(() => {
    if (code === 'null') {
      toast.error('로그인에 실패하였습니다');
      Navigate('/');
    } else {
      networkContext.setToken(code ? code : '');
      localStorage.setItem('JWT', code ? code : '');
      localStorage.setItem('user_id', user_id ? user_id : '');
      userContext.setNowUserID(user_id ? user_id : '');
      Navigate('/');
    }
  }, []);
  return (
    <div
      style={{
        position: 'absolute',
        top: '50px',
        left: '40%',
        right: '40%',
        bottom: '50px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <BeatLoader loading={true}></BeatLoader>
    </div>
  );
}

export default KakaoAuthRedirect;
