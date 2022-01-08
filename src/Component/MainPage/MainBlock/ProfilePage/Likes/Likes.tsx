import { useEffect, useState } from 'react';
import Tweet, { TweetData, UserData } from '../../../../Reused/Tweet/Tweet';
import styles from './Likes.module.scss';

interface Props {
  loadNext: boolean;
  userData: UserData;
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
}

const Likes = ({ loadNext, userData, setLoadAgain, loadAgain }: Props) => {
  useEffect(() => {
    if (loadNext) {
      console.log('다음 페이지 로딩 Likes');
    }
  }, [loadNext]);

  const filteredTweets = userData.tweets.filter(
    item => item.user_like === true,
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
            @{userData.user_id} hasn’t liked any Tweets
          </div>
          <br />
          <div className={styles.SmallNoTweets}>
            When they do, those Tweets will show up here.
          </div>
        </div>
      )}
    </ul>
  );
};

export default Likes;
