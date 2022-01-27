import styles from './Follower.module.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../UserContext';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import UnfollowModal from '../../Modal/UnfollowModal/UnfollowModal';

interface props {
  name: string;
  id: string;
  img: string;
  bio: string;
  follows_me: boolean;
  i_follow: boolean;
  isChosen: string;
}

interface User {
  id: string;
  username: string;
  user_id: string;
  bio: string;
  follows_me: boolean;
}

function Follower(props: props) {
  const userContext = useUserContext();
  const [following, setFollowing] = useState<boolean>(true);
  const [iFollow, setIFollow] = useState(false);
  const navigate = useNavigate();

  const follow = () => {
    axios
      .post('/follow/', { user_id: props.id })
      .then(() => {
        setFollowing(true);
        setIFollow(true);
      })
      .catch(() => {
        toast.error('팔로우 요청 실패');
      });
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    setFollowing(props.i_follow);
    //setIFollow(props.i_follow);
  }, []);
  React.useEffect(() => {
    setFollowing(props.i_follow);
    //console.log('팔로워 업뎃');
  }, [props.isChosen]);
  return (
    <div
      onClick={e => {
        navigate('/' + props.id);
      }}
      className={styles.FollowWrapper}
    >
      <UnfollowModal
        //setIFollow={setIFollow}
        user_id={props.id}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setFollowing={setFollowing}
      />
      <div className={styles.FollowInside}>
        <div className={styles.FollowImg}>
          <span>
            <img src={props.img} alt="no img" width={'40px'} />
          </span>
        </div>
        <div className={styles.FollowLeftWrapper}>
          <div className={styles.FollowTextButton}>
            <div className={styles.FollowNameID}>
              <span className={styles.FollowName}>{props.name}</span>
              <span className={styles.FollowID}>{'@' + props.id}</span>
            </div>
            {props.id !== userContext.nowUserID ? (
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
            ) : null}
          </div>
          <div className={styles.BioWrapper}>{props.bio}</div>
        </div>
      </div>
    </div>
  );
}

export default Follower;
