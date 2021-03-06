import styles from './Tweet.module.scss';
import { ReactComponent as CommentIcon } from '../../../Images/comment.svg';
import { ReactComponent as LikeIcon } from '../../../Images/like.svg';
import { ReactComponent as RetweetIcon } from '../../../Images/retweet.svg';
import retweetTopImage from '../../../Images/retweetTop.svg';
import { ReactComponent as ShareIcon } from '../../../Images/share.svg';
import { ReactComponent as More } from '../../../Images/more.svg';
import { ReactComponent as HeartFulfilled } from '../../../Images/heartFulfilled.svg';
import React, {
  LegacyRef,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import RetweetButtons from '../ButtonGroup/RetweetButtons';
import ReplyTweetModal from '../../Modal/ReplyModalTweet/ReplyTweetModal';
import MoreButtons from '../ButtonGroup/MoreButtons';
import { useUserContext } from '../../../UserContext';

export interface UserData {
  username: string;
  user_id: string;
  bio: string;
  created_at: string;
  birth_date: string;
  tweets: Array<TweetData['TweetType']>;
  tweets_num: string;
  following: string;
  follower: string;
  profile_img: string;
  header_img: string;
  i_follow: boolean;
}

export interface TweetType {
  id: number;
  tweet_type: string;
  author: {
    username: string;
    user_id: string;
    profile_img: string;
  };
  retweeting_user: string;
  retweeting_user_name: string;
  reply_to: string;
  content: string;
  media: string[];
  written_at: string;
  replies: number;
  retweets: number;
  likes: number;
  user_like: boolean;
  user_retweet: boolean;
}

export interface TweetData {
  TweetType: {
    id: number;
    tweet_type: string;
    author: {
      username: string;
      user_id: string;
      profile_img: string;
    };
    retweeting_user: string;
    retweeting_user_name: string;
    reply_to: string;
    content: string;
    media: { media: string }[];
    written_at: string;
    replies: number;
    retweets: number;
    likes: number;
    user_like: boolean;
    user_retweet: boolean;
  };
  TweetsType: {
    id: number;
    tweet_type: string;
    author: {
      username: string;
      user_id: string;
      profile_img: string;
    };
    retweeting_user: string;
    retweeting_user_name: string;
    reply_to: string;
    content: string;
    media: { media: string }[];
    written_at: string;
    replies: number;
    retweets: number;
    likes: number;
    user_like: boolean;
    user_retweet: boolean;
  }[];
}

const Tweet = ({
  item,
  setLoadAgain,
  loadAgain,
}: //isClicked
{
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
  item: TweetData['TweetType'];
  //isClicked: boolean;
}): JSX.Element => {
  const navigate = useNavigate();
  const [replyModalIsOpen, setReplyModalIsOpen] = useState(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isRetweet, setIsRetweet] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);
  const [retweet, setRetweet] = useState<number>(0);
  const [display, setDisplay] = useState<string>('none');
  const [moreDisplay, setMoreDisplay] = useState<string>('none');
  const [month, setMonth] = useState('');
  const [deleteActivated, setDeleteActivated] = useState<boolean>(false);
  const userContext = useUserContext();
  const handleCommentClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    setReplyModalIsOpen(true);
  };

  const handleRetweetIconClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    if (display === 'none') setDisplay('flex');
    else setDisplay('none');
  };

  const handleRetweetClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    if (!isRetweet) {
      axios
        .post('/retweet/', { id: item.id })
        .then(() => {
          console.log('Retweet clicked');
          setIsRetweet(true);
          setRetweet(retweet + 1);
          setDisplay('none');
          setLoadAgain(!loadAgain);
        })
        .catch(() => {
          console.log('Retweet??? ????????? ??? ?????????????????????.');
        });
    } else {
      axios
        .delete('/retweet/' + item.id)
        .then(() => {
          console.log('Undo Retweet clicked');
          setRetweet(retweet - 1);
          setIsRetweet(false);
          setDisplay('none');
          setLoadAgain(!loadAgain);
        })
        .catch(() => {
          console.log('Retweet??? ???????????? ??? ?????????????????????.');
        });
    }
  };

  const handleQuoteRetweetClicked = (
    e: React.MouseEvent<HTMLElement>,
  ): void => {
    e.stopPropagation();
    //????????????
  };

  const handleLikeClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    if (!isLike) {
      axios
        .post('/like/', { id: item.id })
        .then(() => {
          console.log('like clicked');
          setIsLike(true);
          setLike(like + 1);
        })
        .catch(() => {
          console.log('Like??? ????????? ??? ?????????????????????.');
        });
    } else {
      axios
        .delete('/like/' + item.id)
        .then(() => {
          console.log('unlike clicked');
          setLike(like - 1);
          setIsLike(false);
        })
        .catch(() => {
          console.log('Like??? ???????????? ??? ?????????????????????.');
        });
    }
  };

  const handleShareClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    console.log('Share Clicked');
  };

  const create_month = () => {
    switch (item.written_at.slice(5, 7)) {
      case '01':
        setMonth('Jan');
        break;
      case '02':
        setMonth('Feb');
        break;
      case '03':
        setMonth('Mar');
        break;
      case '04':
        setMonth('Apr');
        break;
      case '05':
        setMonth('May');
        break;
      case '06':
        setMonth('Jun');
        break;
      case '07':
        setMonth('Jul');
        break;
      case '08':
        setMonth('Aug');
        break;
      case '09':
        setMonth('Sep');
        break;
      case '10':
        setMonth('Oct');
        break;
      case '11':
        setMonth('Nov');
        break;
      case '12':
        setMonth('Dec');
        break;
    }
  };
  useEffect(() => {
    if (item.tweet_type === 'GENERAL') {
      setDeleteActivated(item.author.user_id === userContext?.userData.userID);
    } else {
      setDeleteActivated(item.retweeting_user === userContext?.userData.userID);
    }
  }, []);

  useEffect(() => {
    create_month();
  }, []);

  useEffect(() => {
    setIsLike(item.user_like);
    setIsRetweet(item.user_retweet);
    setRetweet(item.retweets);
    setLike(item.likes);
  }, []); //like, retweet ????????? ??????
  const handleMoreButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (moreDisplay === 'none') setMoreDisplay('flex');
    else setMoreDisplay('none');
  };
  const handleDeleteClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (item.tweet_type === 'REPLY' || item.tweet_type === 'GENERAL') {
      const tweetType = 'tweet';
      axios
        .delete('/' + tweetType + '/' + item.id)
        .then(() => {
          toast('????????? ?????????????????????.');
          setLoadAgain(!loadAgain);
          setMoreDisplay('none');
        })
        .catch(error => {
          toast('?????? ?????? ??????');
        });
    } else {
      const tweetType = item.tweet_type.toLowerCase();
      axios
        .delete('/' + 'tweet' + '/' + item.id)
        .then(() => {
          toast('???????????? ?????????????????????.');
          setLoadAgain(!loadAgain);
          setMoreDisplay('none');
        })
        .catch(error => {
          toast('????????? ?????? ??????');
        });
    }
  };
  const handleAllWrapperOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/status/${item.id}`, { replace: true });
    window.location.reload();
  };

  return (
      <li className={styles.allWrapper} onClick={handleAllWrapperOnClick}>
        
      <ReplyTweetModal
        isTweetModalOpen={replyModalIsOpen}
        setIsTweetModalOpen={setReplyModalIsOpen}
        item={item}
        loadAgain={loadAgain}
        setLoadAgain={setLoadAgain}
      />
        {item.retweeting_user !== '' ? (
          <div className={styles.topAllWrapper}>
            <div className={styles.retweetedWrapper}>
              <img
                className={styles.retweetedImage}
                src={retweetTopImage}
                alt={retweetTopImage}
              />
              {item.retweeting_user === userContext?.userData.userID ? (
                <div className={styles.retweetedText}>You Retweeted</div>
              ) : (
                <div
                  className={styles.retweetedText}
                >{`${item.retweeting_user_name} Retweeted`}</div> // retweeting_username ???????????? ????????? ??????
              )}
            </div>
          </div>
        ) : null}
        <div className={styles.bottomAllWrapper}>
          <div
            onBlur={() => {
              setDisplay('none');
            }}
          >
            <RetweetButtons
              text={isRetweet ? 'Undo Retweet' : 'Retweet'}
              display={display}
              setDisplay={setDisplay}
              function1={handleRetweetClicked}
              function2={handleQuoteRetweetClicked}
            ></RetweetButtons>
          </div>
          <div
            onBlur={() => {
              setDisplay('none');
            }}
          >
            <MoreButtons
              deleteActivated={deleteActivated}
              text={'DELETE'}
              display={moreDisplay}
              setDisplay={setMoreDisplay}
              function1={handleDeleteClicked}
              function2={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
              }}
            ></MoreButtons>
          </div>
          <div className={styles.leftWrapper}>
            <img
              className={styles.profileImage}
              src={item.author.profile_img}
              alt="tweet Profile Image"
            />
          </div>
          <div className={styles.rightWrapper}>
            <div className={styles.topWrapper}>
              <div className={styles.topTextWrapper}>
                <div className={styles.nameText}>{item.author.username}</div>
                <div className={styles.idTimeText}>
                  @{item.author.user_id} ?? {month}{' '}
                  {item.written_at.slice(8, 10)}
                </div>
              </div>
              <button
                onClick={handleMoreButtonClicked}
                className={styles.moreButton}
              >
                <More className={styles.moreButtonImg} />
              </button>
            </div>
            <div className={styles.middleWrapper}>
              <div className={styles.mainText}>{item.content}</div>
              {item.media
                ? item.media.map(mediaObject => {
                    return (
                      <img
                        key={Math.random()}
                        className={styles.mainImg}
                        src={mediaObject.media}
                        alt="????????? ????????? ?????????."
                      />
                    );
                  })
                : null}
            </div>
            <div className={styles.bottomWrapper}>
              <div className={styles.buttonWrapper}>
                <button
                  className={styles.commentButton}
                  onClick={handleCommentClicked}
                >
                  <CommentIcon className={styles.commentImg} />
                  <div className={styles.commentButtonText}>{item.replies}</div>
                </button>

                {!isRetweet ? (
                  <button
                    className={styles.retweetButton}
                    onClick={handleRetweetIconClicked}
                  >
                    <RetweetIcon className={styles.retweetImg} />
                    <div className={styles.retweetButtonText}>{retweet}</div>
                  </button>
                ) : (
                  <button
                    className={styles.retweetButtonClicked}
                    onClick={handleRetweetIconClicked}
                  >
                    <RetweetIcon className={styles.retweetImg} />
                    <div className={styles.retweetButtonText}>{retweet}</div>
                  </button>
                )}

                {!isLike ? (
                  <button //?????? ???????????? ver.
                    className={styles.likeButton}
                    onClick={handleLikeClicked}
                  >
                    <LikeIcon className={styles.likeImg} />
                    <div className={styles.likeButtonText}>{like}</div>
                  </button>
                ) : (
                  <button //?????? ????????? ver.
                    className={styles.likeButtonClicked}
                    onClick={handleLikeClicked}
                  >
                    <HeartFulfilled className={styles.likeImg} />
                    <div className={styles.likeButtonText}>{like}</div>
                  </button>
                )}

                <button
                  className={styles.shareButton}
                  onClick={handleShareClicked}
                >
                  <ShareIcon className={styles.shareImg} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
  );
};
export default Tweet;
