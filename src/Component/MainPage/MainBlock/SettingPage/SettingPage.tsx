import React, { useRef, useState } from 'react';
import styles from './SettingPage.module.scss';
import Modal from 'react-modal';
import { useUserContext } from '../../../../UserContext';
import axios from 'axios';
function SettingPage() {
  const handleDeactivateClick = () => {
    axios
      .post('/deactivate/')
      .then(() => {})
      .catch(() => {});
  };
  const handleSocialDeactivateClick = () => {
    return null;
  };
  const [deactivateIsOpen, setDeactivateIsOpen] = useState(false);
  const [socialDeactivateIsOpen, setSocialDeactivateIsOpen] = useState(false);
  /*const inputRef = useRef<HTMLInputElement | null>(null)*/
  const [password, setPassword] = useState('');
  const userContext = useUserContext();
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
            top: 'calc(50% - 150px)',
            left: 'calc(50% - 170px)',
            right: 'calc(50% - 170px)',
            bottom: 'calc(50% - 150px)',
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
        <header>Will you Deactivate Account {userContext.nowUserID}?</header>
        <br />
        <br />
        <div>
          Their Tweets will no longer show up in your home timeline. You can
          still view their profile, unless their Tweets are protected.
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
                value={password}
                type="password"
              />
              <button className={styles.UnfollowButton}>Deactivate</button>
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
            top: 'calc(50% - 150px)',
            left: 'calc(50% - 170px)',
            right: 'calc(50% - 170px)',
            bottom: 'calc(50% - 150px)',
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
          Will you Deactivate Social Account {userContext.nowUserID}?
        </header>
        <br />
        <br />
        <div>
          Their Tweets will no longer show up in your home timeline. You can
          still view their profile, unless their Tweets are protected.
        </div>
        <br />
        <footer>
          <div>
            <button
              onClick={e => {
                e.stopPropagation();
              }}
              className={styles.UnfollowButton}
            >
              UnFollow
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
      <button
        className={styles.DeactivateButton}
        onClick={() => {
          setDeactivateIsOpen(true);
        }}
      >
        DEACTIVATE for Email User
      </button>
      <button
        className={styles.SocialDeactivateButton}
        onClick={() => {
          setSocialDeactivateIsOpen(true);
        }}
      >
        DEACTIVATE for Social User
      </button>
    </div>
  );
}

export default SettingPage;
