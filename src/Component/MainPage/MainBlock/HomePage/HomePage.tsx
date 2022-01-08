import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Tweet, { TweetData, UserData } from '../../../Reused/Tweet/Tweet';
import pictureDisabled from '../../../../Images/PictureDisabled.svg';
import picture from '../../../../Images/Picture.svg';
import X from '../../../../Images/X.svg';
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

interface HomeTweetsData {
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
    next: number | null;
    previous: number | null;
  }[]
  user: {
    profile_img: string;
    user_id: string;
    username: string;
  };
}

interface HomeTweetData {
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
  next: number | null;
  previous: number | null;
}


interface Props {
  loadNext: boolean;
}

const HomePage = ({ loadNext }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isEditImageModalOpen, setIsEditImageModalOpen] =
    useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [imageFileList, setImageFileList] = useState<File[]>([]);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);
  const [addImageCount, setAddImageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getHomeTweet = async () => {
    await axios.get(`/home?page=${page}/`)
      .then((response) => {
        if (homeTweetData !== undefined) {
          const fetchHomeTweetData = response.data.tweets;
          const mergedData = homeTweetData.concat(...fetchHomeTweetData);
          setHomeTweetData(mergedData);
          setPage(page+1);
          console.log(fetchHomeTweetData);
          console.log(mergedData);
          console.log(page);
        }
        setProfileImageUrl(response.data.user.profile_img);
        console.log(response.data.tweets);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const [homeTweetData, setHomeTweetData] = useState<HomeTweetsData['tweets']>([{
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
    next: 0,
    previous: 0
  }]
  );

  useEffect(() => {
    if (loadNext) {
      getHomeTweet()
    }
  }, [loadNext]);

  useEffect(() => {
    getHomeTweet();
  }, []);

  const handleAddImageOnSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length === 1) {
      setImageFileList([...imageFileList, e.target.files[0]]);
      setImageUrlList([
        ...imageUrlList,
        URL.createObjectURL(e.target.files[0]),
      ]);
      setAddImageCount(addImageCount + 1);
      setIsEditImageModalOpen(true);
      e.target.value = '';
    }
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef.current !== null) {
      if (e.target.value.length <= 200) {
        setTypedText(e.target.value);
        textAreaRef.current.style.height = '30px';
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + 'px';
      } else {
        setTypedText(e.target.value.slice(0, 200));
      }
    }
  };

  const deleteThisImage = (index: number) => {
    setImageFileList([
      ...imageFileList.slice(0, index),
      ...imageFileList.slice(index + 1, imageFileList.length),
    ]);
    setImageUrlList([
      ...imageUrlList.slice(0, index),
      ...imageUrlList.slice(index + 1, imageUrlList.length),
    ]);
    setAddImageCount(addImageCount - 1);
  };

  const submitTweet = async () => {
    try {
      const formdata = new FormData();
      imageFileList.map(item => {
        formdata.append(`uploadImage${imageFileList.indexOf(item)}`, item);
      });

      const config: AxiosRequestConfig = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const submitData = {
        content: typedText,
        media: formdata,
      };
      const response = await axios.post('/tweet/', submitData, config);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.Loading}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className={styles.HomePageWrapper}>
      <header className={styles.HomeHeader}>Home</header>
      <div className={styles.homeTweetWriteWrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.contentLeftSide}>
            <img
              className={styles.profileImage}
              src={profileImageUrl === null ? '' : profileImageUrl}
              alt={'profile Image'}
            />
          </div>
          <div className={styles.contentRightSide}>
            <textarea
              className={styles.inputWrapper}
              onChange={handleInputOnChange}
              value={typedText}
              ref={textAreaRef}
              maxLength={200}
              placeholder={`What's happening?`}
            />
            <div
              className={styles.lengthText}
              style={
                typedText.length === 200
                  ? { color: 'red' }
                  : typedText.length >= 150
                    ? { color: 'orange' }
                    : undefined
              }
            >
              {typedText.length} / 200
            </div>
            <div
              className={styles.imageNumberText}
              style={
                imageUrlList.length === 2
                  ? { color: 'red' }
                  : imageUrlList.length === 1
                    ? { color: 'orange' }
                    : undefined
              }
            >
              {imageUrlList.length} / 2
            </div>
            <div className={styles.inputImagesWrapper}>
              {imageUrlList.map(item => {
                return (
                  <div
                    className={styles.contentImageWrapper}
                    key={imageUrlList.indexOf(item)}
                  >
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        deleteThisImage(imageUrlList.indexOf(item));
                      }}
                    >
                      <img
                        className={styles.deleteButtonImage}
                        src={X}
                        alt="image Delete Button"
                      />
                    </button>
                    <img
                      className={styles.contentImage}
                      src={item}
                      alt="content Image"
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.controllerWrapper}>
              <div
                className={
                  imageUrlList.length >= 2
                    ? styles.addImageButtonDisabled
                    : styles.addImageButton
                }
              >
                <img
                  className={styles.addImageImage}
                  src={imageUrlList.length >= 2 ? pictureDisabled : picture}
                  alt={'Add Image Button'}
                />
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className={styles.addImageInput}
                  onChange={handleAddImageOnSubmit}
                  disabled={imageUrlList.length >= 2 ? true : false}
                />
              </div>
              <button
                className={
                  typedText === '' && imageUrlList.length === 0
                    ? styles.tweetButtonDisabled
                    : styles.tweetButton
                }
                disabled={
                  typedText === '' && imageUrlList.length === 0 ? true : false
                }
                onClick={submitTweet}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.HomePage}>
        <ul className={styles.tweetsItems}>
          {homeTweetData ?
            homeTweetData.map((item) => (
              <div>
                {item.author ?
                  <Tweet key={item.id} item={item} />
                  :
                  <div>loading</div>
                }
              </div>
            ))
            :
            <div>
              null
            </div>
          }
        </ul>
      </div>
    </div>
  );
};

export default HomePage;

/*
homeTweetData ? (
            homeTweetData.map(item => (
              <div>
                {item.author ? <Tweet key={item.id} item={item} /> : null}
              </div>
            ))
          ) : (
            <div className={styles.Loading}>
              <h1>
                No Tweets!
                <br />
                Follow someone or Tweet!
              </h1>
            </div>
          )
*/