import styles from './Tweet.module.scss';
import { ReactComponent as CommentIcon } from '../../../Images/comment.svg';
import { ReactComponent as LikeIcon } from '../../../Images/like.svg';
import { ReactComponent as RetweetIcon } from '../../../Images/retweet.svg';
import { ReactComponent as ShareIcon } from '../../../Images/share.svg';
import { ReactComponent as More } from '../../../Images/more.svg';
import React, { useEffect, useState } from 'react';
import { TweetData } from '../../MainPage/MainBlock/ProfilePage/Tweets/Tweets';

interface Props {
  item: {
    name: string;
    id: string;
    time: string;
    profileImg: string;
    text: string;
    images: string[];
    commentNumber: string;
    retweetNumber: string;
    likeNumber: string;
    key: string;
  };
}

const Tweet = ({ item }: { item: TweetData['TweetType'] }): JSX.Element => {
  const handleCommentCliecked = (e: React.MouseEvent<HTMLElement>): void => {
    console.log('Comment Clicked');
  };

  const handleRetweetCliecked = (e: React.MouseEvent<HTMLElement>): void => {
    console.log('Retweet Clicked');
  };

  const handleLikeCliecked = (e: React.MouseEvent<HTMLElement>): void => {
    console.log('Like Clicked');
  };

  const handleShareCliecked = (e: React.MouseEvent<HTMLElement>): void => {
    console.log('Share Clicked');
  };

  const [month, setMonth] = useState('');
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
  });

  return (
    <li className={styles.wrapper}>
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
                alt="개시글 이미지 입니다."
              />
            );
          })}
        </div>
        <div className={styles.bottomWrapper}>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.commentButton}
              onClick={handleCommentCliecked}
            >
              <CommentIcon className={styles.commentImg} />
              <div className={styles.commentButtonText}>{item.replies}</div>
            </button>
            <button
              className={styles.retweetButton}
              onClick={handleRetweetCliecked}
            >
              <RetweetIcon className={styles.retweetImg} />
              <div className={styles.retweetButtonText}>{item.retweets}</div>
            </button>
            <button className={styles.likeButton} onClick={handleLikeCliecked}>
              <LikeIcon className={styles.likeImg} />
              <div className={styles.likeButtonText}>{item.likes}</div>
            </button>
            <button
              className={styles.shareButton}
              onClick={handleShareCliecked}
            >
              <ShareIcon className={styles.shareImg} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default Tweet;
