import styles from './TweetModal.module.scss';
import Modal from 'react-modal';
import X from "../../../Images/X.svg";
import twitter from "../../../Images/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg"
import Icon from "../../../Images/Icon.svg"
import Picture from "../../../Images/Picture.svg"
import GIF from "../../../Images/GIF.svg"
import Chart from "../../../Images/Chart.svg"
import Schedule from "../../../Images/Schedule.svg"
import GPS from "../../../Images/GPS.svg"



import React from "react";

interface TweetModalProps {
  isTweetModalOpen: boolean;
  setIsTweetModalOpen: (value: boolean) => void;
  //profileImg: string;
}
const TweetModal = ({
  isTweetModalOpen,
  setIsTweetModalOpen,
  //profileImg,
}: TweetModalProps) => {
  return (
    <Modal isOpen={isTweetModalOpen} style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)'
      },
      content: {
        top: '50px',
        left: '450px',
        right: '450px',
        bottom: '350px',
        border: '1px solid #ccc',
        borderRadius: '20px',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        padding: '0 15px 20px 15px'
      }
    }} className={styles.ModalContainer} >
      <div className={styles.ModalWrapper}>
        <header className={styles.ModalHeader}>
          <div onClick={() => {
            setIsTweetModalOpen(false)
          }} className={styles.XWrapper}><img src={X} width={25} height={25} alt="no img"/></div>
          <div/>
        </header>
        <div className={styles.ModalContent}>
          <div className={styles.ModalContentLeft}>
            <div className={styles.ProfileImgWrapper}>
              <img width={48} height={48} src={twitter} /*profileImg*/ alt="no img"/>
            </div>
          </div>
          <div className={styles.ModalContentRight}>
            <div className={styles.ModalContentInputWrapper}>
              <textarea className={styles.ModalContentInput} placeholder="What's happening?"/>
            </div>
            <div className={styles.BorderWrapper}/>
            <div className={styles.ModalContentButtonWrapper}>
              <div className={styles.IconWrapper}><img className={styles.Icon} src={Picture} alt="no img"/></div>
              <div/>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default TweetModal;
