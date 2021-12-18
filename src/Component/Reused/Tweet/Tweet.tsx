import styles from './Tweet.module.scss';
import { ReactComponent as CommentIcon } from '../../../Images/comment.svg';
import { ReactComponent as LikeIcon } from '../../../Images/like.svg';
import { ReactComponent as RetweetIcon } from '../../../Images/retweet.svg';
import { ReactComponent as ShareIcon } from '../../../Images/share.svg';
import { ReactComponent as More } from '../../../Images/more.svg';

const Tweet = (
  {
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
  },
) => {
  const dummyName = '감자튀김';
  const dummyID = 'FrenchFries';
  const dummyTime = '10h';
  const dummyProfileImg =
    'https://img.sbs.co.kr/newsnet/etv/upload/2014/12/11/30000443115_700.jpg';

  const dummyText =
    '감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아';
  const dummyImages = [
    'http://www.dailygaewon.com/news/photo/201906/4510_5372_5434.JPG',
    'https://src.hidoc.co.kr/image/lib/2019/3/21/20190321174958927_0.jpg',
  ];

  const dummyCommentNumber = '100';
  const dummyRetweetNumber = '2.5k';
  const dummyLikeNumber = '4.5k';

  return (
    <li className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <img
          className={styles.profileImage}
          src={dummyProfileImg}
          alt="tweet Profile Image"
        />
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.topWrapper}>
          <div className={styles.topTextWrapper}>
            <div className={styles.nameText}>{dummyName}</div>
            <div className={styles.idTimeText}>
              @{dummyID} · {dummyTime}
            </div>
          </div>
          <button className={styles.moreButton}>
            <More className={styles.moreButtonImg} />
          </button>
        </div>
        <div className={styles.middleWrapper}>
          <div className={styles.mainText}>{dummyText}</div>
          {dummyImages.map(imgUrl => {
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
          <form className={styles.buttonWrapper}>
            <button className={styles.commentButton}>
              <CommentIcon className={styles.commentImg} />
              <div className={styles.commentButtonText}>
                {dummyCommentNumber}
              </div>
            </button>
            <button className={styles.retweetButton}>
              <RetweetIcon className={styles.retweetImg} />
              <div className={styles.retweetButtonText}>
                {dummyRetweetNumber}
              </div>
            </button>
            <button className={styles.likeButton}>
              <LikeIcon className={styles.likeImg} />
              <div className={styles.likeButtonText}>{dummyLikeNumber}</div>
            </button>
            <button className={styles.shareButton}>
              <ShareIcon className={styles.shareImg} />
            </button>
          </form>
        </div>
      </div>
    </li>
  );
};
export default Tweet;

