import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Tweet, { TweetData, UserData } from '../../../Reused/Tweet/Tweet';
import pictureDisabled from '../../../../Images/PictureDisabled.svg';
import picture from '../../../../Images/Picture.svg';
import defaultProfileImage from '../../../../Images/defaultProfileImage.jpeg';
import X from '../../../../Images/X.svg';
import styles from './HomePage.module.scss';
import CropImageModal from '../../../Modal/TweetModal/CropImageModal/CropImageModal';
import { MoonLoader } from 'react-spinners';
import { useUserContext } from '../../../../UserContext';
import { width } from '@mui/system';

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
    retweeting_user_name: string;
    content: string;
    media: { media: string }[];
    written_at: string;
    replies: number;
    retweets: number;
    likes: number;
    user_like: boolean;
    user_retweet: boolean;
    next: number | null;
    previous: number | null;
  }[];
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
  media: { media: string }[];
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
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
  loadNext: boolean;
}
const HomePage = ({ loadNext, setLoadAgain, loadAgain }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileImageUrl, setProfileImageUrl] =
    useState<string>(defaultProfileImage);
  const [isEditImageModalOpen, setIsEditImageModalOpen] =
    useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [imageFileList, setImageFileList] = useState<File[]>([]);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);
  const [addImageCount, setAddImageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loadNextOkay, setLoadNextOkay] = useState<boolean>(true);

  const userContext = useUserContext();

  const getHomeTweet = async () => {
    if (loadNextOkay) {
      await axios
        .get(`/home/?page=${page}`)
        .then(response => {
          if (homeTweetData !== undefined) {
            const fetchHomeTweetData = response.data.tweets.slice(0, 10);
            const mergedData = homeTweetData.concat(...fetchHomeTweetData);
            setHomeTweetData(mergedData);
            setPage(response.data.tweets[response.data.tweets.length - 1].next);
            if (
              response.data.tweets[response.data.tweets.length - 1].next ===
              null
            ) {
              setLoadNextOkay(false);
            }
          }
          setProfileImageUrl(response.data.user.profile_img);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const updateHomeTweet = async () => {
    await axios
      .get(`/home/?page=1`)
      .then(response => {
        if (homeTweetData !== undefined) {
          setHomeTweetData(response.data.tweets.slice(0, 10));
          setPage(response.data.tweets[response.data.tweets.length - 1].next);
          console.log(page);
        }
        setProfileImageUrl(response.data.user.profile_img);
        console.log(response.data.tweets);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [homeTweetData, setHomeTweetData] = useState<HomeTweetsData['tweets']>(
    [],
  );

  useEffect(() => {
    if (loadNext && page !== null) {
      getHomeTweet();
    }
  }, [loadNext]);

  useEffect(() => {
    updateHomeTweet();
  }, [loadAgain]);

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

  const clearTweetBox = () => {
    setIsEditImageModalOpen(false);
    setTypedText('');
    setImageFileList([]);
    setImageUrlList([]);
    setAddImageCount(0);
  };

  const submitTweet = async () => {
    try {
      const submitDataFormdata = new FormData();
      imageFileList.map(item => {
        submitDataFormdata.append(`media`, item);
      });
      const config: AxiosRequestConfig = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      submitDataFormdata.append('content', typedText);
      const response = await axios.post('/tweet/', submitDataFormdata, config);
      setLoadAgain(!loadAgain);
      clearTweetBox();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.HomePageWrapper}>
      <CropImageModal
        isOpen={isEditImageModalOpen}
        setIsOpen={setIsEditImageModalOpen}
        imageFileList={imageFileList}
        setImageFileList={setImageFileList}
        imageUrlList={imageUrlList}
        setImageUrlList={setImageUrlList}
        addImageCount={addImageCount}
        deleteThisImage={deleteThisImage}
      />
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
      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <MoonLoader color="#1c9bf0" size="40px" speedMultiplier={1} />
        </div>
      ) : (
        <div className={styles.HomePage}>
          <ul className={styles.tweetsItems}>
            {homeTweetData
              ? homeTweetData
                  .filter(item => item.author)
                  .map(item => (
                    <Tweet
                      setLoadAgain={setLoadAgain}
                      loadAgain={loadAgain}
                      key={item.id}
                      item={item}
                    />
                  ))
              : null}
          </ul>
          <div className={styles.Footer}>
            [Waffle Studio 19.5 rookies | Team 2]
            <br />
            FrontEnd: 이승엽, 이하동, 이재민 / BackEnd: 전형민, 이서영, 고계훈
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
