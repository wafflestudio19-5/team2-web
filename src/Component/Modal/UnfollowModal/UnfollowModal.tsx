import styles from './UnfollowModal.module.scss';
import Modal from 'react-modal';
import React from 'react';
import { UserData } from '../../Reused/Tweet/Tweet';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UnfollowModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setFollowing: (value: boolean) => void;
  //setIFollow: (value: boolean) => void;
  user_id: string;
}

const UnfollowModal = ({
  isOpen,
  setIsOpen,
  user_id,
  setFollowing,
}: //setIFollow,
UnfollowModalProps) => {
  const unfollow = () => {
    axios
      .delete('/unfollow/' + user_id)
      .then(() => {
        setFollowing(false);
        setIsOpen(false);
      })
      .catch(() => {
        toast.error('언팔로우 요청 실패');
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
      isOpen={isOpen}
    >
      <header> Unfollow @{user_id}?</header>
      <br />
      <br />
      <div>
        Their Tweets will no longer show up in your home timeline. You can still
        view their profile, unless their Tweets are protected.
      </div>
      <br />
      <footer>
        <div>
          <button
            onClick={e => {
              e.stopPropagation();
              unfollow();
            }}
            className={styles.UnfollowButton}
          >
            UnFollow
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className={styles.CancelButton}
          >
            Cancel
          </button>
        </div>
      </footer>
    </Modal>
  );
};
export default UnfollowModal;
