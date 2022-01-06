import styles from './Follow.module.scss';
import axios from "axios";
import {useState} from "react";

interface props {
  name: string;
  id: string;
  img: string;
}

/*
axios.post('/follow/',{following: user_id})
*/

function Follow(props: props) {
  const [following ,setFollowing] = useState()
  return (
    <div className={styles.FollowWrapper}>
      <div className={styles.FollowInside}>
        <div className={styles.FollowImg}>
          <span>
            <a href="">
              <img src={props.img} alt="no img" width={'40px'} />
            </a>
          </span>
        </div>
        <div className={styles.FollowTextButton}>
          <div className={styles.FollowNameID}>
            <span className={styles.FollowName}>{props.name}</span>
            <span className={styles.FollowID}>{'@' + props.id}</span>
          </div>
          <div className={styles.FollowButtonWrapper}>
            <button className={styles.FollowButton}>Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Follow;
