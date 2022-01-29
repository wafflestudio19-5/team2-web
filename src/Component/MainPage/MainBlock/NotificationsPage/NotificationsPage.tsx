import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../../UserContext';
import styles from './NotificationsPage.module.scss';
import Notification from '../../../Reused/Notification/Notification';

import Tweet, { TweetData } from '../../../Reused/Tweet/Tweet';

export interface NotificationData {
  NotificationType: {
    id: string;
    noti_type: string;
    tweet: TweetData['TweetType'];
    user: {
      user_id: string;
      profile_img: string;
      username: string;
    };
    written_by_me: boolean;
  };
  NotificationsType: {
    id: string;
    noti_type: string;
    tweet: TweetData['TweetType'];
    user: {
      user_id: string;
      profile_img: string;
      username: string;
    };
    written_by_me: boolean;
  }[];
}

interface Props {
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
  loadNext: boolean;
}

function NotificationsPage({ loadNext, setLoadAgain, loadAgain }: Props) {
  const [isChosen, setIsChosen] = useState<string>('');
  const userContext = useUserContext();
  const navigate = useNavigate();
  const loc = useLocation();
  const [allNotificationsPage, setAllNotificationsPage] = useState<
    number | null
  >(1);
  const [mentionsNotificationsPage, setMentionsNotificationsPage] = useState<
    number | null
  >(1);
  const [allNotificationsList, setAllNotificationsList] = useState<
    NotificationData['NotificationsType']
  >([
    {
      id: '',
      noti_type: '',
      tweet: {
        id: 0,
        tweet_type: '',
        author: {
          username: '',
          user_id: '',
          profile_img: '',
        },
        retweeting_user: '',
        retweeting_user_name: '',
        reply_to: '',
        content: '',
        media: [],
        written_at: '',
        replies: 0,
        retweets: 0,
        likes: 0,
        user_like: false,
        user_retweet: false,
        retweeting_user_name: '',
      },
      user: {
        user_id: '',
        profile_img: '',
        username: '',
      },
      written_by_me: false,
    },
  ]);
  const [mentions1NotificationsList, setMentionsotificationsList] =
    useState<NotificationData['NotificationsType']>();
  const [page, setPage] = useState<number>(1);
  const [loadNextOkay, setLoadNextOkay] = useState<boolean>(true);
  const [tweetData, setTweetData] = useState<TweetData['TweetsType']>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();

  useEffect(() => {
    console.log(loc.pathname.slice(1, 14));
    console.log(loc.pathname.slice(15, 24));
    if (loc.pathname.slice(1, 14) === 'notifications') {
      if (loc.pathname.slice(15, 24)) {
        if (loc.pathname.slice(15, 24) === 'mentions') {
          setIsChosen('Mentions');
          allUpdate();
          console.log('hello');
        }
      } else {
        setIsChosen('All');
        allUpdate();
        console.log('nothello');
      }
    }
  }, []);

  const allUpdate = () => {
    if (loadNextOkay) {
        axios
          .get(`/notification/?page=${allNotificationsPage}`)
          .then(response => {
            console.log(response.data);
            console.log(allNotificationsList);
            const fetchNotificationData = response.data.notifications.slice(0, 10);
            const mergedData = allNotificationsList.concat(...fetchNotificationData);
            setAllNotificationsList(mergedData);
            setAllNotificationsPage(response.data.notifications[response.data.notifications.length - 1].next);
            if (
              response.data.notifications[response.data.notifications.length - 1].next ===
              null
            ) {
              setLoadNextOkay(false);
            }
          })
          .catch(error => {
            toast.error('알림 목록을 불러오는 데 실패하였습니다.');
            console.log(error)
          });
    }
  };
  /*
    const mentionsUpdate = () => {
      if (mentionsNotificationsPage !== null) {
        axios
          .get(
            params.id +
            '/notifications/?page=' +
            mentionsNotificationsPage.toString(),
          )
          .then(response => {
            setMentionsNotificationsPage([
              ...mentionsNotificationsPage,
              response.data.results.filter((notification: User) => {
                response.data.results.mention !== null
              }).map((notification: User) => {
                return (
                  <li style={{ listStyle: 'none' }} key={notification.id}>
                    <Notification
  
                    />
                  </li>
                );
              }),
            ]);
            setMentionsNotificationsPage(response.data.next);
          })
          .catch(error => {
            toast.error('알림 목록을 불러오는 데 실패하였습니다.');
          });
      }
    };*/

    
  useEffect(() => {
    if (loadNext) {
      allUpdate();
    }
  }, [loadNext]);
  
    useEffect(() => {
        if (isChosen === 'All') {
          allUpdate();
        } else {
          console.log('mention update')
        }
    }, [isChosen]);
  

  const switchToMentions = () => {
    setIsChosen('Mentions');
    console.log(isChosen);
    navigate('/notifications/mentions');
  };
  const switchToAll = () => {
    setIsChosen('All');
    console.log(isChosen);
    navigate('/notifications');
  };

  return (
    <div className={styles.allWrapper}>
      <header className={styles.NotificationsHeader}>Notifications</header>

      <div className={styles.UserProfileRouterButtonWrapper}>
        {isChosen === 'All' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToAll}
          >
            All
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToAll}
          >
            All
          </button>
        )}
        {isChosen === 'Mentions' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToMentions}
          >
            Mentions
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToMentions}
          >
            Mentions
          </button>
        )}
      </div>
      {isChosen === 'All' ? (
        <ul className={styles.NotificationList}>
          {allNotificationsList ? (
            allNotificationsList.map(item =>
              <Notification
                key={item.id}
                item={item}
                loadAgain={loadAgain}
                setLoadAgain={setLoadAgain}
              />
            )
          ) : (
            <div className={styles.NoTweets}>Not Tweets yet</div>
          )}
        </ul>
      ) : (
        <ul className={styles.NotificationList}>
          <li>mentions</li>
          <li>mentions2</li>
        </ul>
      )}
    </div>
  );
}

export default NotificationsPage;
