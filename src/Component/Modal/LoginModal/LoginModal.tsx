import styles from './LoginModal.module.scss';

import Modal from 'react-modal';
import twitter from '../../../Images/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg';
import X from '../../../Images/X.svg';
import KaKaoLogin from '../../../Images/kakao_login.png';
import React, { useContext, useState } from 'react';
import { KAKAO_AUTH_URL } from '../../../Auth/KakaoAuth.js';
import axios, { AxiosResponse } from 'axios';
import { useNetworkContext } from '../../../Auth/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../UserContext';
import { toast } from 'react-toastify';
import { GOOGLE_AUTH_URL } from '../../../Auth/GoogleAuth';

interface props {
  isOpen: boolean;
  setLoginIsOpen: (boolean: boolean) => void;
}

function LoginModal(props: props) {
  const userContext = useUserContext();
  const navigate = useNavigate();
  const networkContext = useNetworkContext();
  const [authData, setAuthData] = useState({
    user_id: '',
    password: '',
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = () => {
    axios
      .post<{ success: boolean }>(
        '/login/',
        { ...authData },
        { headers: { Authorization: '' } },
      )
      .then((response: any) => {
        localStorage.setItem('JWT', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        props.setLoginIsOpen(false);
        networkContext.setToken(response.data.token);
        userContext?.setUserData({
          ...userContext.userData,
          userID: response.data.user_id,
        });
      })
      .catch(error => {
        toast.error('올바른 입력정보가 아닙니다.');
      });
  };
  return (
    <Modal
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }, //630 650
        content: {
          position: 'absolute',
          top: '50px',
          left: 'calc(50% - 315px)',
          right: 'calc(50% - 315px)',
          bottom: '50px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          padding: '0 15px 20px 15px',
        },
      }}
      isOpen={props.isOpen}
    >
      <div className={styles.ModalWrapper}>
        <header className={styles.ModalHeader}>
          <div
            onClick={() => {
              props.setLoginIsOpen(false);
            }}
            className={styles.XWrapper}
          >
            <img src={X} width={25} height={25} alt="no img" />
          </div>
          <div className={styles.LogoWrapper}>
            <img src={twitter} width={30} height={30} alt="no img" />
          </div>
          <div />
        </header>
        <div className={styles.ModalContent}>
          <span className={styles.ContentMessage}>트위터에 로그인하기</span>
          <button
            onClick={() => {
              window.location.href = GOOGLE_AUTH_URL;
            }}
            className={styles.Button}
          >
            Google 계정으로 로그인하기
          </button>

          <button
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
            className={styles.Button}
            style={{
              backgroundImage: `url(${KaKaoLogin})`,
              backgroundSize: '100% 100%',
            }}
          />

          <div className={styles.BorderWrapper}>또는</div>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              onSubmit();
            }}
            className={styles.InputWrapper}
          >
            <input
              onChange={onChange}
              name={'user_id'}
              className={styles.Input}
              placeholder="사용자 아이디"
              type="text"
            />
            <input
              onChange={onChange}
              className={styles.Input}
              name={'password'}
              placeholder="비밀번호"
              type="password"
            />
            <button className={styles.BlackButton}>다음</button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
