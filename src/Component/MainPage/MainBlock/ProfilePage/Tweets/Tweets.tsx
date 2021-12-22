import { useState } from 'react';
import Tweet from '../../../../Reused/Tweet/Tweet';
import styles from './Tweets.module.scss'


const dummyData=[
  {
    name:'감자튀김',
    id:'FrenchFries',
    time: '10h',
    profileImg: 'https://img.sbs.co.kr/newsnet/etv/upload/2014/12/11/30000443115_700.jpg',
    text: '감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아.감.자.튀.김.조.아',
    images: [
  'http://www.dailygaewon.com/news/photo/201906/4510_5372_5434.JPG',
  'https://src.hidoc.co.kr/image/lib/2019/3/21/20190321174958927_0.jpg',
  ],
    commentNumber: '100',
    retweetNumber: '2.5k',
    likeNumber: '4.5k'
  },
];



function Tweets() {
  
  const [tweetList,setTweetList]=useState(dummyData);
  /*const filteredTweet = tweetItem.filter((item) => {
    return item.name.includes(search);
  })*/
  return (
    <ul className={styles.tweetsItems}>
      {tweetList.map(item => (
        <Tweet key={item.id}/>
      ))}
    </ul>
  );
}

export default Tweets;
