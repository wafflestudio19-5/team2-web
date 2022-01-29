import styles from './VerifyModal.module.scss';
import Modal from 'react-modal';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserContext } from '../../../UserContext';

interface UnfollowModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const VerifyModal = ({ isOpen, setIsOpen }: UnfollowModalProps) => {
  const [verifyCode, setVerifyCode] = useState('');
  const [isSent, setIsSent] = useState(false);
  const userContext = useUserContext();
  const sendCode = () => {
    setIsSent(true);
  };
  const handleCodeSubmit = () => {
    if (verifyCode.length !== 4) toast('인증 코드는 4자리 숫자입니다.');
    else {
    }
  };

  return (
    <Modal
      className={styles.deactivateModal}
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
        content: {
          fontWeight: '600',
          position: 'absolute',
          top: 'calc(50% - 180px)',
          left: 'calc(50% - 190px)',
          right: 'calc(50% - 190px)',
          bottom: 'calc(50% - 180px)',
          border: '1px solid #ccc',
          borderRadius: '20px',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          padding: '20px 30px 20px 30px',
        },
      }}
      isOpen={isOpen}
    >
      {!isSent ? (
        <header className={styles.header}>
          ~~~로
          <br />
          <span onClick={sendCode} className={styles.EmailOrPhone}>
            인증코드 보내기
          </span>
          <button
            onClick={e => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className={styles.CancelButton1}
          >
            Cancel
          </button>
        </header>
      ) : (
        <div>
          <br />
          <div>4자리의 인증코드가 ~~~로 전송되었습니다.</div>
          <br />
          <footer>
            <div>
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleCodeSubmit();
                }}
              >
                <input
                  onChange={e => {
                    if (
                      e.target.value !== e.target.value.replace(/[^0-9]/gi, '')
                    ) {
                      toast('숫자만 입력 가능합니다.');
                    }
                    setVerifyCode(e.target.value.replace(/[^0-9]/gi, ''));
                  }}
                  className={styles.Input}
                  value={verifyCode}
                  placeholder="Verify Code"
                  type="text"
                  maxLength={4}
                />
                <button className={styles.DeactivateButton}>Edit</button>
              </form>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className={styles.CancelButton}
              >
                Cancel
              </button>
            </div>
          </footer>
        </div>
      )}
    </Modal>
  );
};
export default VerifyModal;
