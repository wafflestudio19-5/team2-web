import { useEffect, useState } from 'react';
import Tweet, { TweetData, UserData } from '../../../../Reused/Tweet/Tweet';
import styles from './Media.module.scss';

interface Props {
  loadNext: boolean;
  userData: UserData;
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
}

const Media = ({ loadNext, userData, setLoadAgain, loadAgain }: Props) => {
  useEffect(() => {
    if (loadNext) {
      console.log('다음 페이지 로딩 Media');
    }
  }, [loadNext]);

  const filteredTweets = userData.tweets.filter(item =>
    item.media ? item.media.length > 0 : null,
  );

  return (
    <ul className={styles.tweetsItems}>
      {filteredTweets.length > 0 ? (
        filteredTweets.map(item => (
          <Tweet
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
            key={item.id}
            item={item}
          />
        ))
      ) : (
        <div className={styles.NoTweetsBlock}>
          <div className={styles.BigNoTweets}>
            @{userData.user_id} hasn’t Tweeted any photos or videos
          </div>
          <br />
          <div className={styles.SmallNoTweets}>
            When they do, their media will show up here
          </div>
        </div>
      )}
    </ul>
  );
};

export default Media;
