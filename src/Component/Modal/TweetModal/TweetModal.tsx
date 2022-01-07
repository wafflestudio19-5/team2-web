import styles from './TweetModal.module.scss';
import Modal from 'react-modal';
import X from '../../../Images/X.svg';
import picture from '../../../Images/Picture.svg';
import pictureDisabled from '../../../Images/PictureDisabled.svg';
import React, { useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useUserContext } from '../../../UserContext';
import CropImageModal from './CropImageModal/CropImageModal';

interface TweetModalProps {
  isTweetModalOpen: boolean;
  setIsTweetModalOpen: (value: boolean) => void;
}

const TweetModal = ({
  isTweetModalOpen,
  setIsTweetModalOpen,
}: TweetModalProps) => {
  const userContext = useUserContext();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [isEditImageModalOpen, setIsEditImageModalOpen] =
    useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [imageFileList, setImageFileList] = useState<File[]>([]);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);
  const [addImageCount, setAddImageCount] = useState<number>(0);

  const loadImageDate = async () => {
    try {
      const response = await axios.get(
        `/user/${userContext.nowUserID}/profile/`,
      );
      setProfileImageUrl(response.data.profile_img);
    } catch (e) {
      console.log(e);
    }
  };

  const clearModal = () => {
    setProfileImageUrl('');
    setIsEditImageModalOpen(false);
    setTypedText('');
    setImageFileList([]);
    setImageUrlList([]);
    setAddImageCount(0);
  };

  const handleExitOnClick = () => {
    setIsTweetModalOpen(false);
    clearModal();
  };

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
      const response = await axios.post('/tweet/', submitDataFormdata);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <CropImageModal
        isOpen={isEditImageModalOpen}
        setIsOpen={setIsEditImageModalOpen}
        imageFileList={imageFileList}
        setImageFileList={setImageFileList}
        imageUrlList={imageUrlList}
        setImageUrlList={setImageUrlList}
        addImageCount={addImageCount}
      />
      <Modal
        isOpen={isTweetModalOpen}
        style={
          imageUrlList.length === 0
            ? undefined
            : {
                content: {
                  top: 'calc(50% - 300px)',
                  bottom: ' calc(50% - 300px)',
                },
              }
        }
        className={styles.modalStyle}
        overlayClassName={styles.overlayStyle}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          setIsTweetModalOpen(false);
          clearModal();
        }}
        onAfterOpen={() => {
          loadImageDate();
        }}
        onAfterClose={() => {
          clearModal();
        }}
        ariaHideApp={false}
      >
        <div className={styles.allWrapper}>
          <header className={styles.headerWrapper}>
            <button className={styles.exitButton} onClick={handleExitOnClick}>
              <img
                className={styles.xImage}
                src={X}
                alt={'Exit Button Image'}
              />
            </button>
          </header>
          <div className={styles.contentWrapper}>
            <div className={styles.contentLeftSide}>
              <img
                className={styles.profileImage}
                src={profileImageUrl}
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
              <div className={styles.emptyBox}></div>
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
      </Modal>
    </>
  );
};

export default TweetModal;
