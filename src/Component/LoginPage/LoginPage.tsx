import React, { useState } from 'react';
import KaKaoStart from '../LoginPage/KakaoStart.png';
import Background from '../LoginPage/LoginBackground.png';
import Twitter from '../../Images/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg';
import styles from './LoginPage.module.scss';
import LoginModal from '../Modal/LoginModal/LoginModal';
import SignUpModal from '../Modal/SignUpModal/SignUpModal';

const LoginPage = () => {
  const [loginModalOpen, setLoginIsOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  return (
    <div className={styles.LoginPageWrapper}>
      <LoginModal
        setLoginIsOpen={setLoginIsOpen}
        isOpen={loginModalOpen}
      ></LoginModal>
      <SignUpModal
        setSignUpIsOpen={setSignUpModalOpen}
        isOpen={signUpModalOpen}
      ></SignUpModal>
      <div className={styles.Left}>
        <img className={styles.Background} src={Background} alt="No Image" />
      </div>
      <div className={styles.Right}>
        <img src={Twitter} alt="No Image" height={40} width={40} />
        <div className={styles.Text1}>
          <span>지금 일어나고 있는 일</span>
        </div>
        <div className={styles.Text2}>
          <span>오늘 트위터에 가입하세요.</span>
        </div>
        <div className={styles.SignUpWrapper}>
          <button className={styles.Button}>Google 계정으로 가입하기</button>
          <button
            className={styles.Button}
            style={{
              backgroundImage: `url(${KaKaoStart})`,
              backgroundSize: '100% 100%',
            }}
          />
          <div className={styles.BorderWrapper}>또는</div>
          <button
            onClick={() => {
              setSignUpModalOpen(true);
            }}
            className={styles.Button}
          >
            휴대폰 번호나 이메일 주소로 가입하기
          </button>
          <div className={styles.Text3}>
            By signing up, you agree to the{' '}
            <a className={styles.Link} href="">
              Terms of Service{' '}
            </a>
            and{' '}
            <a className={styles.Link} href="">
              Privacy Policy
            </a>{' '}
            , including Cookie Use.
          </div>
        </div>

        <div className={styles.LoginWrapper}>
          <span className={styles.Text4}>이미 트위터에 가입하셨나요?</span>
          <button
            onClick={() => {
              setLoginIsOpen(true);
            }}
            className={styles.Button}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
