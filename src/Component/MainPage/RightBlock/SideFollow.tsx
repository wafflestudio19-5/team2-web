import styles from './SideFollow.module.scss';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../UserContext';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

interface props {
  name: string;
  id: string;
  img: string;
}

interface User {
  id: string;
  username: string;
  user_id: string;
  bio: string;
}

function SideFollow(props: props) {
  const userContext = useUserContext();
  const [following, setFollowing] = useState(false);
  const navigate = useNavigate();

  const follow = () => {
    axios
      .post('/follow/', { user_id: props.id })
      .then(() => {
        setFollowing(true);
      })
      .catch(error => {
        toast.error('팔로우 요청 실패');
      });
  };

  const unfollow = () => {
    axios
      .delete('/unfollow/' + props.id)
      .then(() => {
        setFollowing(false);
        setIsOpen(false);
      })
      .catch(() => {
        toast.error('언팔로우 요청 실패');
      });
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      onClick={e => {
        navigate('/' + props.id);
      }}
      className={styles.FollowWrapper}
    >
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
        <header> Unfollow @{props.id}? </header>
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
      <div className={styles.FollowInside}>
        <div className={styles.FollowImg}>
          <span>
            <img src={props.img} alt="no img" width={'40px'} />
          </span>
        </div>
        <div className={styles.FollowTextButton}>
          <div className={styles.FollowNameID}>
            <span className={styles.FollowName}>{props.name}</span>
            <span className={styles.FollowID}>{'@' + props.id}</span>
          </div>
          <div className={styles.FollowButtonWrapper}>
            {following ? (
              <button
                onClick={e => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className={styles.FollowingButton}
              >
                Following
              </button>
            ) : (
              <button
                onClick={e => {
                  e.stopPropagation();
                  follow();
                }}
                className={styles.FollowButton}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideFollow;
