import { MouseEventHandler } from 'react';
import styles from './UserProfile.module.scss';

function UserProfile(props: any) {
  const switchToTweets = () => {
    props.setIsChosen('Tweets');
  };
  const switchToTweetsAndReplies = () => {
    props.setIsChosen('TweetsAndReplies');
  };
  const switchToMedia = () => {
    props.setIsChosen('Media');
  };
  const switchToLikes = () => {
    props.setIsChosen('Likes');
  };

  return (
    <>
      <header className={styles.UserProfileHeader}>
        <button className={styles.UserProfileHeaderButton}>back</button>
        <div>
          <div className={styles.UserProfileHeaderName}>id.name</div>
          <div className={styles.UserProfileHeaderTweetsCount}>
            ($id.tweet.count)Tweets
          </div>
        </div>
      </header>
      <body className={styles.UserProfileBody}>
        <div />
        <div>
          <div>
            <img /> {/*profile img*/}
            <button>Edit profile</button>
          </div>
          <div>
            <p>id.name</p>
            <p>@id</p>
            <p>text</p>
            <p>join date</p>
            <p>($id.following.count)following ($id.follower.count)follower</p>
          </div>
        </div>
      </body>
      <button onClick={switchToTweets}>to Tweets</button>
      <button onClick={switchToTweetsAndReplies}>
        switchToTweetsAndReplies
      </button>
      <button onClick={switchToMedia}>switchToMedia</button>
      <button onClick={switchToLikes}>switchToLikes</button>
    </>
  );
}

export default UserProfile;
