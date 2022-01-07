import styles from './TweetModal.module.scss';
import Modal from 'react-modal';
import X from '../../../Images/X.svg';
import twitter from '../../../Images/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg';
import { ReactComponent as Icon } from '../../../Images/Icon.svg';
import { ReactComponent as Picture } from '../../../Images/Picture.svg';
import { ReactComponent as GIF } from '../../../Images/GIF.svg';
import { ReactComponent as Chart } from '../../../Images/Chart.svg';
import { ReactComponent as Schedule } from '../../../Images/Schedule.svg';
import { ReactComponent as GPS } from '../../../Images/GPS.svg';
import { ReactComponent as Comment } from '../../../Images/comment.svg';

import React, { ChangeEventHandler, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import { useUserContext } from '../../../UserContext';

interface TweetModalProps {
  isTweetModalOpen: boolean;
  setIsTweetModalOpen: (value: boolean) => void;
  //profileImg: string;
}
const TweetModal = ({
  isTweetModalOpen,
  setIsTweetModalOpen,
}: //profileImg,
TweetModalProps) => {
  const [files, setFiles] = useState<FileList | null>();
  const [content, setContent] = useState<string>('');
  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    setFiles(file);
  };
  const contentChangedHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const userContext = useUserContext();
  const loc = useLocation();
  const onClick = () => {
    axios
      .post('/tweet/', {
        content: content,
        media: files,
      })
      .then(() => {
        window.location.replace(`/${loc.pathname}`);
        console.log('hi my name is yuna');
        setIsTweetModalOpen(false);
      })
      .catch(() => {
        toast.error('트윗 올리기에 실패했습니다.');
      });
  };
  return (
    <Modal
      isOpen={isTweetModalOpen}
      style={{
        overlay: {
          position: 'fixed',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        content: {
          top: '50px',
          left: '450px',
          right: '450px',
          bottom: '420px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          padding: '0 15px 20px 15px',
        },
      }}
      className={styles.ModalContainer}
    >
      <div className={styles.ModalWrapper}>
        <header className={styles.ModalHeader}>
          <div
            onClick={() => {
              setIsTweetModalOpen(false);
            }}
            className={styles.XWrapper}
          >
            <img src={X} width={25} height={25} alt="no img" />
          </div>
          <div />
        </header>
        <div className={styles.ModalContent}>
          <div className={styles.ModalContentLeft}>
            <div className={styles.ProfileImgWrapper}>
              <img
                width={48}
                height={48}
                src={twitter}
                /*profileImg*/ alt="no img"
              />
            </div>
          </div>
          <div className={styles.ModalContentRight}>
            <div className={styles.ModalContentInputWrapper}>
              <textarea
                onChange={e => {
                  contentChangedHandler(e);
                }}
                className={styles.ModalContentInput}
                placeholder="What's happening?"
              ></textarea>
            </div>
            <div className={styles.BorderWrapper} />
            <div className={styles.ModalContentRightFooter}>
              <div className={styles.ModalContentButtonWrapper}>
                <input
                  onChange={event => {
                    fileChangedHandler(event);
                  }}
                  name="file"
                  id="file"
                  type="file"
                />
                <div className={styles.IconWrapper}>
                  <Picture className={styles.Icon} />
                </div>
                <div className={styles.IconWrapper}>
                  <GIF className={styles.Icon} />
                </div>
                <div className={styles.IconWrapper}>
                  <Chart className={styles.Icon} />
                </div>
                <div className={styles.IconWrapper}>
                  <Icon className={styles.Icon} />
                </div>
                <div className={styles.IconWrapper}>
                  <Schedule className={styles.Icon} />
                </div>
              </div>
              <div className={styles.TweetButtonWrapper}>
                <button onClick={onClick} className={styles.Button}>
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TweetModal;
