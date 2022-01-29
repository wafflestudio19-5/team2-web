import styles from './Notification.module.scss';
import { ReactComponent as CommentIcon } from '../../../Images/comment.svg';
import { ReactComponent as LikeIcon } from '../../../Images/like.svg';
import { ReactComponent as RetweetIcon } from '../../../Images/retweet.svg';
import retweetTopImage from '../../../Images/retweetTop.svg';
import { ReactComponent as ShareIcon } from '../../../Images/share.svg';
import { ReactComponent as More } from '../../../Images/more.svg';
import { ReactComponent as HeartFulfilled } from '../../../Images/heartFulfilled.svg';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import RetweetButtons from '../ButtonGroup/RetweetButtons';
import ReplyTweetModal from '../../Modal/ReplyModalTweet/ReplyTweetModal';
import MoreButtons from '../ButtonGroup/MoreButtons';
import { NotificationData } from '../../MainPage/MainBlock/NotificationsPage/NotificationsPage';
import { useUserContext } from '../../../UserContext';

const Notification = ({
  item,
}: {
  item: NotificationData['NotificationType'];
}): JSX.Element => {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const [replyModalIsOpen, setReplyModalIsOpen] = useState(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isRetweet, setIsRetweet] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);
  const [retweet, setRetweet] = useState<number>(0);
  const [display, setDisplay] = useState<string>('none');
  const [moreDisplay, setMoreDisplay] = useState<string>('none');
  const [month, setMonth] = useState('');
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
        })
        .catch(() => {
          console.log('Retweet을 남기는 데 실패하였습니다.');
        });
    } else {
      axios
        .delete('/retweet/' + item.id)
        .then(() => {
          console.log('Undo Retweet clicked');
          setRetweet(retweet - 1);
          setIsRetweet(false);
          setDisplay('none');
        })
        .catch(() => {
          console.log('Retweet을 취소하는 데 실패하였습니다.');
        });
    }
  };

  const handleQuoteRetweetClicked = (
    e: React.MouseEvent<HTMLElement>,
  ): void => {
    e.stopPropagation();
    //모달열기
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
          console.log('Like를 남기는 데 실패하였습니다.');
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
          console.log('Like를 취소하는 데 실패하였습니다.');
        });
    }
  };

  const handleShareClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    console.log('Share Clicked');
  };

  const create_month = () => {
    switch (item.tweet.written_at.slice(5, 7)) {
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
    create_month();
  }, []);

  useEffect(() => {
    setIsLike(item.tweet.user_like);
    setIsRetweet(item.tweet.user_retweet);
    setRetweet(item.tweet.retweets);
    setLike(item.tweet.likes);
  }, []); //like, retweet 초깃값 설정
  const handleMoreButtonClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (moreDisplay === 'none') setMoreDisplay('flex');
    else setMoreDisplay('none');
  };
  const handleDeleteClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (
      item.tweet.tweet_type === 'REPLY' ||
      item.tweet.tweet_type === 'GENERAL'
    ) {
      const tweetType = 'tweet';
      axios
        .delete('/' + tweetType + '/' + item.id)
        .then(() => {
          toast('트윗이 삭제되었습니다.');
          setMoreDisplay('none');
        })
        .catch(error => {
          toast('트윗 삭제 실패');
        });
    } else {
      const tweetType = item.tweet.tweet_type.toLowerCase();
      axios
        .delete('/' + 'tweet' + '/' + item.id)
        .then(() => {
          toast('리트윗이 삭제되었습니다.');
          setMoreDisplay('none');
        })
        .catch(error => {
          toast('리트윗 삭제 실패');
        });
    }
  };
  const handleAllWrapperOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/status/${item.id}`);
  };

  if (item.noti_type === 'REPLY') {
    return (
      <>
        <li className={styles.allWrapper} onClick={handleAllWrapperOnClick}>
          {retweet ? (
            <div className={styles.topAllWrapper}>
              <div className={styles.retweetedWrapper}>
                <img
                  className={styles.retweetedImage}
                  src={retweetTopImage}
                  alt={retweetTopImage}
                />
                <div className={styles.retweetedText}>Retweeted</div>
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
                setDisplay={setDisplay}
                text={isRetweet ? 'Undo Retweet' : 'Retweet'}
                display={display}
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
                deleteActivated={item.written_by_me}
                setDisplay={setMoreDisplay}
                text={'DELETE'}
                display={moreDisplay}
                function1={handleDeleteClicked}
                function2={handleQuoteRetweetClicked}
              ></MoreButtons>
            </div>
            <div className={styles.leftWrapper}>
              <img
                className={styles.profileImage}
                src={item.tweet.author.profile_img}
                alt="tweet Profile Image"
              />
            </div>
            <div className={styles.rightWrapper}>
              <div className={styles.topWrapper}>
                <div className={styles.topTextWrapper}>
                  <div className={styles.nameText}>
                    {item.tweet.author.username}
                  </div>
                  <div className={styles.idTimeText}>
                    @{item.tweet.author.user_id} · {month}{' '}
                    {item.tweet.written_at.slice(8, 10)}
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
                <div className={styles.mainText}>{item.tweet.content}</div>
              </div>
              <div className={styles.bottomWrapper}>
                <div className={styles.buttonWrapper}>
                  <button
                    className={styles.commentButton}
                    onClick={handleCommentClicked}
                  >
                    <CommentIcon className={styles.commentImg} />
                    <div className={styles.commentButtonText}>
                      {item.tweet.replies}
                    </div>
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
                    <button //하트 안차있는 ver.
                      className={styles.likeButton}
                      onClick={handleLikeClicked}
                    >
                      <LikeIcon className={styles.likeImg} />
                      <div className={styles.likeButtonText}>{like}</div>
                    </button>
                  ) : (
                    <button //하트 차있는 ver.
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
      </>
    );
  }

  if (item.noti_type === 'RETWEET') {
    return (
      <>
        <li className={styles.allWrapper} onClick={handleAllWrapperOnClick}>
          <div>{item.user.username} retweeted</div>
          {retweet ? (
            <div className={styles.topAllWrapper}>
              <div className={styles.retweetedWrapper}>
                <img
                  className={styles.retweetedImage}
                  src={retweetTopImage}
                  alt={retweetTopImage}
                />
                <div className={styles.retweetedText}>Retweeted</div>
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
                setDisplay={setDisplay}
                text={isRetweet ? 'Undo Retweet' : 'Retweet'}
                display={display}
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
                deleteActivated={item.written_by_me}
                text={'DELETE'}
                display={moreDisplay}
                setDisplay={setDisplay}
                function1={handleDeleteClicked}
                function2={handleQuoteRetweetClicked}
              ></MoreButtons>
            </div>
            <div className={styles.leftWrapper}>
              <img
                className={styles.profileImage}
                src={item.tweet.author.profile_img}
                alt="tweet Profile Image"
              />
            </div>
            <div className={styles.rightWrapper}>
              <div className={styles.topWrapper}>
                <div className={styles.topTextWrapper}>
                  <div className={styles.nameText}>
                    {item.tweet.author.username}
                  </div>
                  <div className={styles.idTimeText}>
                    @{item.tweet.author.user_id} · {month}{' '}
                    {item.tweet.written_at.slice(8, 10)}
                  </div>
                </div>
              </div>
              <div className={styles.middleWrapper}>
                <div className={styles.mainText}>{item.tweet.content}</div>
              </div>
              <div className={styles.bottomWrapper}></div>
            </div>
          </div>
        </li>
      </>
    );
  }

  return <div>hello</div>;
};

export default Notification;
