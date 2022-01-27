import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../../UserContext';
import styles from './NotificationsPage.module.scss';
import Notification from '../../../Reused/Notification/Notification';


/*function NotificationsPage() {
  return (
    <div className={styles.NotificationsPage}>
      <header className={styles.NotificationsHeader}>Notifications</header>
      <div className={styles.Loading}>
        <h1>No Notifications</h1>
      </div>
    </div>
  );
}*/


interface User {
  id: string;
  username: string;
  user_id: string;
  bio: string;
  follows_me: boolean;
  profile_img: string;
  i_follow: boolean;
}

interface Props {
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
  loadNext: boolean;
}

function NotificationsPage({ loadNext, setLoadAgain, loadAgain }: Props) {
  const [isChosen, setIsChosen] = useState<string>('');
  const userContext = useUserContext();
  const params = useParams();
  const navigate = useNavigate();
  const loc = useLocation();
  const [allNotificationsPage, setAllNotificationsPage] = useState<number | null>(1);
  const [mentionsNotificationsPage, setMentionsNotificationsPage] = useState<number | null>(1);
  const [allNotificationsList, setAllNotificationsList] = useState<User[] | null>(
    null,
  );
  const [mentions1NotificationsList, setMentionsotificationsList] = useState<User[] | null>(null);

  console.log(params);

  useEffect(() => {
    console.log(loc.pathname.slice(1, 14
      ))
    console.log(loc.pathname.slice(15, 24
      ))
    if (loc.pathname.slice(1, 14) === 'notifications') {
      if(loc.pathname.slice(15, 24
        )){
        if(loc.pathname.slice(15, 24
          )==='mentions'){
          setIsChosen('Mentions');
        }
      }
      else{
        setIsChosen('All');
      }
    }
  }, []);

  /*const AllUpdate = () => {
    if (allNotificationsPage !== null) {
      axios
        .get(
          params.id +
          '/notifications/?page=' +
          allNotificationsPage.toString(),
        )
        .then(response => {
          setAllNotificationsPage([
            ...allNotificationsPage,
            response.data.results.map((notification: User) => {
              return (
                <li style={{ listStyle: 'none' }} key={notification.id}>
                  <Notification

                  />
                </li>
              );
            }),
          ]);
          setAllNotificationsPage(response.data.next);
        })
        .catch(error => {
          toast.error('알림 목록을 불러오는 데 실패하였습니다.');
        });
    }
  };

  /*const MentionsUpdate = () => {
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
  };

  useEffect(() => {
    allUpdate();
    mentionsUpdate();
  }, []);

  useEffect(() => {
    if (loadNext) {
      console.log('loadnext');
      if (isChosen === 'All') {
        allUpdate();
      } else {
        mentionsUpdate();
      }
    }
  }, [loadNext]);*/

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
      <header className={styles.NotificationsHeader}>
        Notifications
      </header>

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
        <ul className={styles.FollowList}>
          <li>
            all
          </li><li>
            all2
          </li>
        </ul>
      ) : (
        <ul className={styles.FollowList}>

          <li>
            mentions
          </li><li>
            mentions2
          </li>
        </ul>
      )}
    </div>
  );
}
export default NotificationsPage;