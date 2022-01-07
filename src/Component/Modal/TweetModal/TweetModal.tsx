import styles from './TweetModal.module.scss';
import Modal from 'react-modal';
import X from '../../../Images/X.svg';
import picture from '../../../Images/Picture.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [isEditImageModalOpen, setIsEditImageModalOpen] =
    useState<boolean>(false);
  const [typedText, setTypedText] = useState('');
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
    if (e.target.value.length <= 200) {
      setTypedText(e.target.value);
    } else {
      setTypedText(e.target.value.slice(0, 200));
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
        className={styles.modalStyle}
        overlayClassName={styles.overlayStyle}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          setIsTweetModalOpen(false);
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
                maxLength={200}
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
              <div className={styles.inputImagesWrapper}>
                {imageUrlList.map(item => {
                  <img
                    className={styles.contentImage}
                    key={imageUrlList.indexOf(item)}
                    src={item}
                    alt="content Image"
                  />;
                })}
              </div>
              <div className={styles.controllerWrapper}>
                <div className={styles.addImageButton}>
                  <img
                    className={styles.addImageImage}
                    src={picture}
                    alt={'Add Image Button'}
                  />
                  <input
                    type="file"
                    className={styles.addImageInput}
                    onChange={handleAddImageOnSubmit}
                  />
                </div>
                <button
                  className={
                    typedText === ''
                      ? styles.tweetButtonDisabled
                      : styles.tweetButton
                  }
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
