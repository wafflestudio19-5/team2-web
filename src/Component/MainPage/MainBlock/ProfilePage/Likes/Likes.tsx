import { useEffect, useState } from 'react';
import Tweet, {TweetData, UserData} from '../../../../Reused/Tweet/Tweet';
import styles from './Likes.module.scss';


interface Props {
  loadNext: boolean;
  userData: UserData;
}

const Likes = ({ loadNext, userData }: Props) => {
  
  useEffect(() => {
    if (loadNext) {
      console.log('다음 페이지 로딩 Likes');
    }
  }, [loadNext]);

  return (
    <ul className={styles.tweetsItems}>
      {userData ? (
        userData.tweets.map(item => <Tweet key={item.id} item={item} />)
      ) : (
        <div className={styles.NoTweets}>Not Tweets yet</div>
      )}
    </ul>
  );
};

export default Likes;
