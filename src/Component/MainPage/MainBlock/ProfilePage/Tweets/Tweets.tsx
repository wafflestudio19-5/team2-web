import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tweet, { UserData, TweetData } from '../../../../Reused/Tweet/Tweet';
import styles from './Tweets.module.scss';
import { slice } from 'lodash';

interface Props {
  loadNext: boolean;
  userData: UserData;
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
}


const Tweets = ({ loadNext, userData, setLoadAgain, loadAgain }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [loadNextOkay, setLoadNextOkay] = useState<boolean>(true);
  const [tweetData, setTweetData] = useState<TweetData['TweetsType']>(
    userData.tweets,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();

  const getTweet = async () => {
    if (loadNextOkay) {
      await axios
        .get(`/user/${params.id}/?page=${page}`)
        .then(response => {
          if (tweetData !== undefined) {
            const fetchHomeTweetData = response.data.tweets.slice(0, 10);
            const mergedData = tweetData.concat(...fetchHomeTweetData);
            setTweetData(mergedData);
            setPage(response.data.tweets[response.data.tweets.length - 1].next);
            if (
              response.data.tweets[response.data.tweets.length - 1].next ===
              null
            ) {
              setLoadNextOkay(false);
            }
            console.log(fetchHomeTweetData);
            console.log(mergedData);
            console.log(page);
          }
          console.log(response.data.tweets);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (loadNext && Number(userData.tweets_num) > 10) {
      getTweet();
    }
  }, [loadNext]);

  return (
    <ul className={styles.tweetsItems}>
      {tweetData ? (
        tweetData.map(item =>
          item.author ? (<Tweet
                setLoadAgain={setLoadAgain}
                loadAgain={loadAgain}
                key={item.id}
                item={item}
              />) : <div></div>,
        )
      ) : (
        <div className={styles.NoTweets}>Not Tweets yet</div>
      )}
    </ul>
  );
};

export default Tweets;
