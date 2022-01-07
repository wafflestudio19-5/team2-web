import { useEffect, useState } from 'react';
import Tweet from '../../../../Reused/Tweet/Tweet';
import styles from './Tweets.module.scss';

const dummyData = [
  {
    name: '감자튀김',
    id: 'FrenchFries',
    time: '10h',
    profileImg:
      'https://img.sbs.co.kr/newsnet/etv/upload/2014/12/11/30000443115_700.jpg',
    text: '감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아',
    images: [
      'http://www.dailygaewon.com/news/photo/201906/4510_5372_5434.JPG',
      'https://src.hidoc.co.kr/image/lib/2019/3/21/20190321174958927_0.jpg',
    ],
    commentNumber: '100',
    retweetNumber: '2.5k',
    likeNumber: '4.5k',
    key: '1',
  },
  {
    name: '징버거',
    id: 'JingBurger',
    time: '3min',
    profileImg:
      'https://w.namu.la/s/ec5be7fbad71fb5dfc41fb21f5eae44f43ab629b0a5f8629d0c57f56a64ea35bdff4fe23ad35ff158fff1e672efc44565ee9ac9195050491411b0a982a8dea985e9bb3d80a1c93e0e99af626eaa3f3e793d111c28106a94cc96dcbd44459a638',
    text: '안녕하세요~ 징~버거입니다~',
    images: [
      'https://w.namu.la/s/82db436174608ea71ccd15413a8307e01043e361ec2255cd7589aa736321cd49c3908d06726749612d942c807b265ee737013cf6ecbe722063695a84507acc93d8fd48a04f61eeda3d13d039dd38ec134259c039ca2872e7f5557e19cc27a088',
    ],
    commentNumber: '1.8k',
    retweetNumber: '7.5k',
    likeNumber: '45.6k',
    key: '2',
  },
  {
    name: '이재민',
    id: 'ijaemin020827',
    time: '1s',
    profileImg: 'https://cdn.kado.net/news/photo/201911/996781_433270_1949.jpg',
    text: '#안녕하세요 #소통해요 #북평고등학교 #화이팅',
    images: ['https://cdn.kado.net/news/photo/201911/996781_433270_1949.jpg'],
    commentNumber: '1',
    retweetNumber: '0',
    likeNumber: '4',
    key: '3',
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

interface Props {
  loadNext: boolean;
}

const Tweets = ({ loadNext }: Props) => {
  const [tweetList, setTweetList] = useState<Data[]>(dummyData);
  useEffect(() => {
    if (loadNext) {
      console.log('다음 페이지 로딩 Tweets');
    }
  }, [loadNext]);

  return (
    <ul className={styles.tweetsItems}>
      {tweetList.map(item => (
        <Tweet key={item.key} item={item} />
      ))}
    </ul>
  );
};

export default Tweets;
