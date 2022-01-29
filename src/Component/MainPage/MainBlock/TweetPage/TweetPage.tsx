import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import arrow from '../../../../Images/arrow-left.svg';
import { ReactComponent as CommentIcon } from '../../../../Images/comment.svg';
import { ReactComponent as HeartUnfilled } from '../../../../Images/heartUnfilled.svg';
import { ReactComponent as HeartFulfilled } from '../../../../Images/heartFulfilled.svg';
import { ReactComponent as RetweetIcon } from '../../../../Images/retweet.svg';
import { ReactComponent as ShareIcon } from '../../../../Images/share.svg';
import styles from './TweetPage.module.scss';
import Tweet, { TweetData } from '../../../Reused/Tweet/Tweet';
import { MoonLoader } from 'react-spinners';

interface userDataType {
  author: {
    username: string;
    user_id: string;
    profile_img: string;
  };
  content: string;
  media: { media: string }[];
  written_at: string;
  likes: number;
}

interface Props {}

function TweetPage({
  setLoadAgain,
  loadAgain,
}: {
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
}) {
  const params = useParams();
  const navigate = useNavigate();
  const [userData, setUsetData] = useState<userDataType>();
  const [liked, setLiked] = useState(false);
  const [likeNumber, setLikeNumber] = useState<number>(0);
  const [replyTweet, setReplyTweet] = useState<TweetData['TweetsType']>([]);
  const [isLodaing, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadThread();
  }, []);

  const loadThread = async () => {
    try {
      const response = await axios.get(`/tweet/${params.tweet}/`);
      setUsetData(response.data);
      setLiked(response.data.user_like);
      setLikeNumber(response.data.likes);
      setReplyTweet(response.data.replying_tweets);
      setIsLoading(false);
      console.log(response.data.replying_tweets);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGoBackOnClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.TweetPage}>
      <header className={styles.TweetHeader}>
        <button className={styles.goBackButton} onClick={handleGoBackOnClick}>
          <img className={styles.goBackImage} src={arrow} alt="go Back Image" />
        </button>
        <div>Thread</div>
      </header>
      {isLodaing ? (
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingInsideWrapper}>
            <MoonLoader color="#1c9bf0" size="40px" speedMultiplier={1} />
          </div>
        </div>
      ) : (
        <div className={styles.TweetBody}>
          <div className={styles.authorTweetWrapper}>
            <div className={styles.topWrapper}>
              <img
                className={styles.profileImage}
                src={userData?.author.profile_img}
                alt="Author Profile Image"
                onClick={() => navigate(`/${userData?.author.user_id}`)}
              />
              <div
                className={styles.topTextWrapper}
                onClick={() => navigate(`/${userData?.author.user_id}`)}
              >
                <div className={styles.topNameText}>
                  {userData?.author.username}
                </div>
                <div className={styles.topIdText}>
                  @{userData?.author.user_id}
                </div>
              </div>
            </div>
            <div className={styles.middleWrapper}>
              <div className={styles.contentWrapper}>{userData?.content}</div>
              <div className={styles.mediaWrapper}>
                {userData?.media.map(item => {
                  return (
                    <img
                      className={styles.mediaImages}
                      src={item.media}
                      key={userData.media.indexOf(item)}
                      alt="media item"
                    />
                  );
                })}
              </div>
              <div className={styles.informationWrapper}>
                <div className={styles.informationText}>
                  {dayjs(userData?.written_at).format('h:m A · MMM D, YYYY')}
                </div>
                {likeNumber === 0 ? null : likeNumber === 1 ? (
                  <div className={styles.likesNumberText}>
                    {likeNumber} <div className={styles.likesText}>like</div>
                  </div>
                ) : (
                  <div className={styles.likesNumberText}>
                    {likeNumber} <div className={styles.likesText}>likes</div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.bottomWrapper}>
              <button className={styles.commentButton}>
                <CommentIcon className={styles.commentImg} />
              </button>

              <button className={styles.retweetButton}>
                <RetweetIcon className={styles.retweetImg} />
              </button>
              {!liked ? (
                <button //하트 안차있는 ver.
                  className={styles.likeButton}
                >
                  <HeartUnfilled className={styles.likeImg} />
                </button>
              ) : (
                <button //하트 차있는 ver.
                  className={styles.heartFilledButton}
                >
                  <HeartFulfilled className={styles.heartFilled} />
                </button>
              )}

              <button className={styles.shareButton}>
                <ShareIcon className={styles.shareImg} />
              </button>
            </div>
          </div>
          <div className={styles.tweetsWrapper}>
            <ul className={styles.tweetsItems}>
              {replyTweet.slice(0, replyTweet.length - 1).map(item => {
                return (
                  <Tweet
                    loadAgain={loadAgain}
                    setLoadAgain={setLoadAgain}
                    item={item}
                    key={replyTweet.indexOf(item)}
                  />
                );
              })}
            </ul>
          </div>
          {/* <div className={styles.footerWrapper}>footer</div> */}
        </div>
      )}
    </div>
  );
}

export default TweetPage;
