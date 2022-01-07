import { useEffect, useState } from 'react';
import Tweet, {TweetData, UserData} from '../../../../Reused/Tweet/Tweet';
import styles from './Media.module.scss';



interface Props {
  loadNext: boolean;
  userData: UserData;
}

const Media = ({ loadNext, userData }: Props) => {
  
  useEffect(() => {
    if (loadNext) {
      console.log('다음 페이지 로딩 Media');
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

export default Media;
