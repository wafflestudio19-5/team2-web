import styles from './Tweet.module.scss';
import { ReactComponent as CommentIcon } from '../../../Images/reply.svg';
import { ReactComponent as LikeIcon } from '../../../Images/heartUnfilled.svg';
import { ReactComponent as RetweetIcon } from '../../../Images/retweetUnclicked.svg';
import retweetTopImage from '../../../Images/retweetTop.svg';
import { ReactComponent as ShareIcon } from '../../../Images/share.svg';
import { ReactComponent as More } from '../../../Images/more.svg';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import RetweetButtons from '../ButtonGroup/RetweetButtons';
import ReplyTweetModal from '../../Modal/ReplyModalTweet/ReplyTweetModal';


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
    reply_to: string;
    content: string;
    media: string[];
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
    reply_to: string;
    content: string;
    media: string[];
    written_at: string;
    replies: number;
    retweets: number;
    likes: number;
    user_like: boolean;
    user_retweet: boolean;
  }[];
}

const Tweet = ({ item }: { item: TweetData['TweetType'] }): JSX.Element => {
  const navigate = useNavigate();
  const [replyModalIsOpen, setReplyModalIsOpen] = useState(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isRetweet, setIsRetweet] = useState<boolean>(false);
  const [like, setLike] = useState<number>();
  const [retweet, setRetweet] = useState<number>();
  const [display, setDisplay] = useState<string>('none');
  const [month, setMonth] = useState('');
  const handleCommentClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    setReplyModalIsOpen(true);

  };

  const handleRetweetIconClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    if (display === 'none') setDisplay('flex');
    else setDisplay('none');
  };

  const handleRetweetClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    if (!isRetweet) {
      axios
        .post('/retweet/', { id: item.id })
        .then(() => {
          toast('Retweet clicked');
          setIsRetweet(true);
          setDisplay('none');
        })
        .catch(() => {
          toast.error('Retweet을 남기는 데 실패하였습니다.');
        });
    } else {
      axios
        .delete('/retweet/' + item.id)
        .then(() => {
          toast('Undo Retweet clicked');
          setIsRetweet(false);
        })
        .catch(() => {
          toast.error('Retweet을 취소하는 데 실패하였습니다.');
        });
    }
  };

  const handleQuoteRetweetClicked = (
    e: React.MouseEvent<HTMLElement>,
  ): void => {
    e.stopPropagation()
    //모달열기
  };

  const handleLikeClicked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
    if (!isLike) {
      axios
        .post('/like/', { id: item.id })
        .then(() => {
          toast('like clicked');
          setIsLike(true);
        })
        .catch(() => {
          toast.error('Like를 남기는 데 실패하였습니다.');
        });
    } else {
      axios
        .delete('/like/' + item.id)
        .then(() => {
          toast('unlike clicked');
          setIsLike(false);
        })
        .catch(() => {
          toast.error('Like를 취소하는 데 실패하였습니다.');
        });
    }
  };

  const handleShareCliecked = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation()
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
    create_month();
  }, []);

  useEffect(() => {
    setIsLike(item.user_like);
    setIsRetweet(item.user_retweet);
    setRetweet(item.retweets);
    setLike(item.likes);
  }, []); //like, retweet 초깃값 설정

  const handleAllWrapperOnClick = (e:React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    navigate(`/status/${item.id}`);
  };

  return (
    <>
      <ReplyTweetModal
        isTweetModalOpen={replyModalIsOpen}
        setIsTweetModalOpen={setReplyModalIsOpen}
      />
      <li className={styles.allWrapper} onClick={handleAllWrapperOnClick}>
        {item.user_retweet ? (
          <div className={styles.topAllWrapper}>
            <div className={styles.retweetedWrapeer}>
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
              display={display}
              function1={handleRetweetClicked}
              function2={handleQuoteRetweetClicked}
            ></RetweetButtons>
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
              @{item.author.user_id} · {month} {item.written_at.slice(8, 10)}
            </div>
          </div>
          <button className={styles.moreButton}>
            <More className={styles.moreButtonImg} />
          </button>
        </div>
        <div className={styles.middleWrapper}>
          <div className={styles.mainText}>{item.content}</div>
          {item.media.map(imgUrl => {
            return (
              <img
                key={Math.random()}
                className={styles.mainImg}
                src={imgUrl}
                alt="게시글 이미지 입니다."
              />
            );
          })}
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

            <button
              className={styles.retweetButton}
              onClick={handleRetweetIconClicked}
            >
              <RetweetIcon className={styles.retweetImg} />
              <div className={styles.retweetButtonText}>{retweet}</div>
            </button>
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
                <LikeIcon className={styles.likeImg} />
                <div className={styles.likeButtonText}>{item.likes}</div>
              </button>
            )}

            <button
              className={styles.shareButton}
              onClick={handleShareCliecked}
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
};
export default Tweet;
