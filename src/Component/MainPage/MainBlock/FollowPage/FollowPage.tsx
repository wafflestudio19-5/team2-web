import React, {
  useEffect,
  useState,
} from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import styles from './FollowPage.module.scss';
import arrow_left from '../../../../Images/arrow-left.svg';
import { useUserContext } from '../../../../UserContext';
import Follow from "../../../Reused/Follow/Follow";
import axios from "axios";
import {toast} from "react-toastify";
import Follower from "../../../Reused/Follower/Follower.module";


interface User {
  id: string;
  username: string;
  user_id: string;
  bio: string;
  follows_me: boolean;
  profile_img: string
}

interface Props {
    loadNext: boolean;
}


function FollowPage({loadNext}:Props) {
  const [isChosen, setIsChosen] = useState<string>('');
  const userContext = useUserContext();
  const navigate = useNavigate();
  const params = useParams();
  const [followings, setFollowings] = useState<JSX.Element[]>([]);
  const [followers, setFollowers] = useState<JSX.Element[]>([]);
  const loc = useLocation();
  const [followingPage, setFollowingPage] = useState<number|null>(1);
  const [followerPage, setFollowerPage] = useState<number|null>(1);
  const [userFollowingList, setUserFollowingList] = useState<User[] | null>(null);
  const [userFollowerList, setUserFollowerList] = useState<User[] | null>(null);



  useEffect(() => {
    if (
      loc.pathname.slice(
          params.id ? params.id.length + 2 : 0,
          params.id ? params.id.length + 11 : 0,
      ) === 'following'
    ) {
      setIsChosen('following');
    } else if (
      loc.pathname.slice(
          params.id ? params.id.length + 2 : 0,
          params.id ? params.id.length + 11 : 0,
      ) === 'followers'
    ) {
      setIsChosen('followers');
    }
  },[]);



  const followingUpdate = () => {
      if(followingPage!==null){
          axios.get('/follow_list/'+params.id+'/following/?page='+followingPage.toString())
              .then((response)=>{
                  setFollowings([
                      ...followings,
                      response.data.results.map((follow:User) => {
                          return (
                              <li style={{listStyle:"none"}} key={follow.id}>
                                 <Follow I_follow={/*follow.I_follow*/false} bio={follow.bio} img={follow.profile_img}  id={follow.user_id}
                                          follows_me={follow.follows_me} name={follow.username}/>
                               </li>
                          );
                      }),
                  ]);
                  setFollowingPage(response.data.next);
              })
              .catch((error)=>{
                  toast.error("팔로잉 목록을 불러오는 데 실패하였습니다.")
              })
      }

  }

  const followerUpdate = () => {
      if (followerPage !== null) {
          axios.get('/follow_list/'+params.id+'/follower/?page='+ followerPage.toString())
              .then((response)=>{
                  setFollowers([
                      ...followers,
                      response.data.results.map((follow:User) => {

                          return (
                              <li style={{listStyle:"none"}} key={follow.id}>
                                  <Follower I_follow={false} bio={follow.bio} img={follow.profile_img}  id={follow.user_id}
                                       follows_me={follow.follows_me} name={follow.username}/>
                              </li>
                          );
                      }),
                  ]);
                  setFollowerPage(response.data.next);
              })
              .catch((error)=>{
                  toast.error("팔로워 목록을 불러오는 데 실패하였습니다.")
              })
      }

  }

  useEffect(() => {
      followerUpdate();
      followingUpdate();
  },[]);
  useEffect(()=>{
      if(loadNext) {
          if(isChosen==='following') {
              followingUpdate()
          } else {
              followerUpdate()
          }
      }
  },[loadNext])
  const switchToFollowing = () => {
    setIsChosen('following');
    navigate(`/${params.id}/following`);
  };
  const switchToFollowers = () => {
    setIsChosen('followers');
    navigate(`/${params.id}/followers`);
  };

  return (
    <div className={styles.allWrapper}>
      <header className={styles.UserProfileHeader}>
        <img
          className={styles.UserProfileHeaderButton}
          src={arrow_left}
          width={25}
          height={25}
          alt="back"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div>
          <div className={styles.UserProfileHeaderName}>id.name</div>
          <div className={styles.UserProfileHeaderID}>@user_id</div>
        </div>
      </header>

      <div className={styles.UserProfileRouterButtonWrapper}>
        {isChosen === 'followers' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToFollowers}
          >
            followers
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToFollowers}
          >
            followers
          </button>
        )}
        {isChosen === 'following' ? (
          <button
            className={styles.UserProfileRouterButtonClicked}
            onClick={switchToFollowing}
          >
            following
          </button>
        ) : (
          <button
            className={styles.UserProfileRouterButtonUnclicked}
            onClick={switchToFollowing}
          >
            following
          </button>
        )}
      </div>
        {isChosen === 'following' ?
            <ul className={styles.FollowList}>
                {followings}
            </ul>
            :
            <ul className={styles.FollowList}>
                {followers}
            </ul>
        }
    </div>
  );
}

export default FollowPage;
