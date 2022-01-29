import React, { useEffect, useRef, useState } from 'react';
import styles from './SettingPage.module.scss';
import Modal from 'react-modal';
import { useUserContext } from '../../../../UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import VerifyModal from '../../../Modal/EmailVerifyModal/VerifyModal';
function SettingPage() {
  const handleDeactivateClick = () => {
    axios
      .post('/deactivate/', { password: password })
      .then(() => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('user_id');
        window.location.replace('/');
        userContext?.setUserDataDefault();
        setDeactivateIsOpen(false);
        toast('회원탈퇴가 성공적으로 이뤄졌습니다.');
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };
  const handleSocialDeactivateClick = () => {
    axios
      .post('/kakao/unlink/')
      .then(() => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('user_id');
        window.location.replace('/');
        userContext?.setUserDataDefault();
        setSocialDeactivateIsOpen(false);
        toast('회원탈퇴가 성공적으로 이뤄졌습니다.');
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [deactivateIsOpen, setDeactivateIsOpen] = useState(false);
  const [socialDeactivateIsOpen, setSocialDeactivateIsOpen] = useState(false);
  const [verifyIsOpen, setVerifyIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState('');
  const userContext = useUserContext();
  useEffect(() => {
    axios
      .get('/user/' + userContext?.userData.userID + '/profile/')
      .then(response => {
        setIsVerified(response.data.isVerified);
        if (
          response.data.phone_number === null ||
          response.data.phone_number === 'null'
        ) {
          console.log('씨발');
          setEmailOrPhone(response.data.email);
          setIsEmail(true);
        } else {
          setEmailOrPhone(response.data.phone_number);
          setIsEmail(false);
        }
      })
      .catch(() => {
        toast.error('프로필 정보를 받아오지 못함');
      });
  }, []);
  return (
    <div className={styles.SettingPage}>
      <Modal
        className={styles.deactivateModal}
        ariaHideApp={false}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
          content: {
            fontWeight: '600',
            position: 'absolute',
            top: 'calc(50% - 200px)',
            left: 'calc(50% - 190px)',
            right: 'calc(50% - 190px)',
            bottom: 'calc(50% - 200px)',
            border: '1px solid #ccc',
            borderRadius: '20px',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            outline: 'none',
            padding: '20px 30px 20px 30px',
          },
        }}
        isOpen={deactivateIsOpen}
      >
        <header>
          Will you Deactivate Account {userContext?.userData.userID}?
        </header>
        <br />
        <div>
          계정을 탈퇴하시면 다시 가입하실 수 없습니다. 정말로 탈퇴하시려면
          비밀번호를 한 번 더 입력해주세요.
        </div>
        <br />
        <footer>
          <div>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeactivateClick();
              }}
            >
              <input
                onChange={e => {
                  setPassword(e.target.value);
                }}
                className={styles.Input}
                value={password}
                placeholder="password"
                type="password"
              />
              <button className={styles.DeactivateButton}>Deactivate</button>
            </form>
            <button
              onClick={e => {
                e.stopPropagation();
                setDeactivateIsOpen(false);
              }}
              className={styles.CancelButton}
            >
              Cancel
            </button>
          </div>
        </footer>
      </Modal>

      <Modal
        ariaHideApp={false}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
          content: {
            fontWeight: '600',
            position: 'absolute',
            top: 'calc(50% - 200px)',
            left: 'calc(50% - 190px)',
            right: 'calc(50% - 190px)',
            bottom: 'calc(50% - 200px)',
            border: '1px solid #ccc',
            borderRadius: '20px',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            outline: 'none',
            padding: '20px 30px 20px 30px',
          },
        }}
        isOpen={socialDeactivateIsOpen}
        className={styles.socialDeactivateModal}
      >
        <header>
          Will you Deactivate Social Account {userContext?.userData.userID}?
        </header>
        <br />
        <div>
          계정을 탈퇴하시면 다시 가입하실 수 없습니다. 정말로 탈퇴하시려면
          체크박스를 클릭해주세요.
        </div>
        <br />
        <div className={styles.CheckBoxWrapper}>
          <span>계정을 탈퇴합니다.</span>
          <input ref={inputRef} type="checkbox" />
        </div>
        <br />
        <footer>
          <div>
            <button
              onClick={e => {
                e.stopPropagation();
                if (inputRef.current?.checked) {
                  handleSocialDeactivateClick();
                } else {
                  toast('체크박스를 확인해주세요.');
                }
              }}
              className={styles.DeactivateButton}
            >
              Deactivate
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                setSocialDeactivateIsOpen(false);
              }}
              className={styles.CancelButton}
            >
              Cancel
            </button>
          </div>
        </footer>
      </Modal>
      <VerifyModal
        emailOrPhone={emailOrPhone}
        setIsOpen={setVerifyIsOpen}
        isEmail={isEmail}
        isOpen={verifyIsOpen}
      />
      <button
        className={styles.DeactivateButton}
        onClick={() => {
          setDeactivateIsOpen(true);
        }}
      >
        DEACTIVATE for Email/Phone User
      </button>
      <button
        className={styles.SocialDeactivateButton}
        onClick={() => {
          setSocialDeactivateIsOpen(true);
        }}
      >
        DEACTIVATE for Social User
      </button>
      {!isVerified ? (
        <button
          className={styles.SocialDeactivateButton}
          onClick={() => {
            setVerifyIsOpen(true);
          }}
        >
          Verify for Email/Phone User
        </button>
      ) : null}
    </div>
  );
}

export default SettingPage;
