import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tweet, { TweetData, UserData } from '../../../Reused/Tweet/Tweet';
import styles from './HomePage.module.scss';

const dummyData = [
  {
    id: 1,
    tweet_type: 'GENERAL',
    author: {
      username: '감자튀김',
      user_id: 'FrenchFries',
      profile_img:
        'https://img.sbs.co.kr/newsnet/etv/upload/2014/12/11/30000443115_700.jpg',
    },
    retweeting_user: '10',
    reply_to: '100',
    written_at: '2022-07-08T09:21:27.488585Z',
    content:
      '감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아',
    media: [
      'http://www.dailygaewon.com/news/photo/201906/4510_5372_5434.JPG',
      'https://src.hidoc.co.kr/image/lib/2019/3/21/20190321174958927_0.jpg',
    ],
    replies: 5,
    retweets: 6,
    likes: 1000,
    user_like: false,
    user_retweet: false,
  },
  {
    id: 2,
    tweet_type: 'GENERAL',
    author: {
      username: '징버거',
      user_id: 'JingBurger',
      profile_img:
        'https://w.namu.la/s/ec5be7fbad71fb5dfc41fb21f5eae44f43ab629b0a5f8629d0c57f56a64ea35bdff4fe23ad35ff158fff1e672efc44565ee9ac9195050491411b0a982a8dea985e9bb3d80a1c93e0e99af626eaa3f3e793d111c28106a94cc96dcbd44459a638',
    },
    retweeting_user: '10',
    reply_to: '100',
    written_at: '2022-07-08T09:21:27.488585Z',
    content:
      '안녕하세요~ 징~버거입니다~ 해냈다~ 해냈어~ 버거가 해냈어~ 징버거! 해냈다~ 해냈어~ 버거가 해냈어~ 징버거!해냈다~ 해냈어~ 버거가 해냈어~ 징버거!',
    media: [
      'https://w.namu.la/s/82db436174608ea71ccd15413a8307e01043e361ec2255cd7589aa736321cd49c3908d06726749612d942c807b265ee737013cf6ecbe722063695a84507acc93d8fd48a04f61eeda3d13d039dd38ec134259c039ca2872e7f5557e19cc27a088',
    ],
    replies: 5,
    retweets: 6,
    likes: 1032100,
    user_like: false,
    user_retweet: false,
  },
  {
    id: 3,
    tweet_type: 'GENERAL',
    author: {
      username: '이재민',
      user_id: 'JaeminLee',
      profile_img:
        'https://cdn.kado.net/news/photo/201911/996781_433270_1949.jpg',
    },
    retweeting_user: '10',
    reply_to: '100',
    written_at: '2022-07-08T09:21:27.488585Z',
    content: '#안녕하세요 #소통해요 #북평고등학교 #화이팅',
    media: ['https://cdn.kado.net/news/photo/201911/996781_433270_1949.jpg'],
    replies: 17,
    retweets: 63,
    likes: 0,
    user_like: false,
    user_retweet: false,
  },
];

interface Data {
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
}

interface HomeTweetData {

  tweets: {
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
  user: {
    profile_img: string;
    user_id: string;
    username: string;
  };
}

interface Props {
  loadNext: boolean;
}

const HomePage = ({ loadNext }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getHomeTweet = async () => {
    try {
      const response = await axios.get(`/home/`);
      setHomeTweetData(response.data.tweets);
      console.log(response.data.tweets);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [homeTweetData, setHomeTweetData] = useState<TweetData['TweetsType']>([
    {
      id: 0,
      tweet_type: '',
      author: {
        username: '',
        user_id: '',
        profile_img: '',
      },
      retweeting_user: '',
      reply_to: '',
      content: '',
      media: [],
      written_at: '',
      replies: 0,
      retweets: 0,
      likes: 0,
      user_like: false,
      user_retweet: false,
    },
  ]);

  useEffect(() => {
    if (loadNext) {
      console.log('다음 페이지 로딩 HomeTweets');
    }
  }, [loadNext]);

  useEffect(() => {

    getHomeTweet();
    console.log(homeTweetData);

  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.HomePageWrapper}>
      <header className={styles.HomeHeader}>Home</header>
      <div className={styles.HomeTweetInputWrapper}></div>
      <div className={styles.HomePage}>
        {homeTweetData ? (
          <ul className={styles.tweetsItems}>
            {homeTweetData ? (
              homeTweetData.map(item => (
                <div>
                  {item.author ? (
                    <Tweet key={item.id} item={item} />
                  ) : (
                    <div style={{ marginTop: '100px' }}>Loading...</div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.NoTweets}>Not Tweets yet</div>
            )}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
