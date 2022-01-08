import { useEffect, useState } from 'react';
import Tweet, { UserData } from '../../../../Reused/Tweet/Tweet';
import styles from './Tweets.module.scss';
import { slice } from 'lodash';

interface Props {
  loadNext: boolean;
  userData: UserData;
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
}

const Tweets = ({ loadNext, userData, setLoadAgain, loadAgain }: Props) => {
  useEffect(() => {
    if (loadNext) {
      console.log('다음 페이지 로딩 Tweets');
    }
  }, [loadNext]);

  return (
    <ul className={styles.tweetsItems}>
      {userData ? (
        userData.tweets
          .slice(0, 10)
          .map(item =>
            item.author ? (
              <Tweet
                setLoadAgain={setLoadAgain}
                loadAgain={loadAgain}
                key={item.id}
                item={item}
              />
            ) : (
              <div>loading</div>
            ),
          )
      ) : (
        <div className={styles.NoTweets}>Not Tweets yet</div>
      )}
    </ul>
  );
};

export default Tweets;
