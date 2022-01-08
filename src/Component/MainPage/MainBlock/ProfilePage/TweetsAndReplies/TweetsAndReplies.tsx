import { useEffect, useState } from 'react';
import Tweet, { TweetData, UserData } from '../../../../Reused/Tweet/Tweet';
import styles from './TweetsAndReplies.module.scss';

interface Props {
  loadNext: boolean;
  userData: UserData;
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
}

const TweetsAndReplies = ({
  loadNext,
  userData,
  setLoadAgain,
  loadAgain,
}: Props) => {
  useEffect(() => {
    if (loadNext) {
      console.log('다음 페이지 로딩 TweetsAndReplies');
    }
  }, [loadNext]);

  const filteredTweets = userData.tweets.filter(item => item.replies > 0);

  return (
    <div>
      {filteredTweets.length > 0 ? (
        <ul className={styles.tweetsItems}>
          {filteredTweets.map(item => (
            <Tweet
              setLoadAgain={setLoadAgain}
              loadAgain={loadAgain}
              key={item.id}
              item={item}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.NoTweets}>No Tweets yet</div>
      )}
    </div>
  );
};

export default TweetsAndReplies;
