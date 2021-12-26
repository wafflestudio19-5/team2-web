import styles from './Tweet.module.scss';
import { ReactComponent as CommentIcon } from '../../../Images/comment.svg';
import { ReactComponent as LikeIcon } from '../../../Images/like.svg';
import { ReactComponent as RetweetIcon } from '../../../Images/retweet.svg';
import { ReactComponent as ShareIcon } from '../../../Images/share.svg';
import { ReactComponent as More } from '../../../Images/more.svg';
import { Props } from '../../MainPage/MainBlock/ProfilePage/Tweets/Tweets';
import React from 'react';

const Tweet = (
  /*{
    //   tweetType,
    //   author,
    //   retweetingUser,
    //   replyTo,
    //   content,
    //   media,
    //   createdAt,
    //   replies,
    //   retweets,
    //   likes,
    //   userlike,
  },*/
  { item }: { item: Props['tweetType'] },
): JSX.Element => {
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

  return (
    <li className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <img
          className={styles.profileImage}
          src={item.profileImg}
          alt="tweet Profile Image"
        />
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.topWrapper}>
          <div className={styles.topTextWrapper}>
            <div className={styles.nameText}>{item.name}</div>
            <div className={styles.idTimeText}>
              @{item.id} · {item.time}
            </div>
          </div>
          <button className={styles.moreButton}>
            <More className={styles.moreButtonImg} />
          </button>
        </div>
        <div className={styles.middleWrapper}>
          <div className={styles.mainText}>{item.text}</div>
          {item.images.map(imgUrl => {
            return (
              <img
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
              <div className={styles.commentButtonText}>
                {item.commentNumber}
              </div>
            </button>
            <button
              className={styles.retweetButton}
              onClick={handleRetweetCliecked}
            >
              <RetweetIcon className={styles.retweetImg} />
              <div className={styles.retweetButtonText}>
                {item.retweetNumber}
              </div>
            </button>
            <button className={styles.likeButton} onClick={handleLikeCliecked}>
              <LikeIcon className={styles.likeImg} />
              <div className={styles.likeButtonText}>{item.likeNumber}</div>
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
