import styles from './EditIDModal.module.scss';
import Modal from 'react-modal';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UnfollowModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user_id: string;
}

const EditIDModal = ({ isOpen, setIsOpen, user_id }: UnfollowModalProps) => {
  const [changeID, setChangeID] = useState('');

  const handleIDPatch = () => {
    if (changeID.length < 4) toast('4자 이상으로 입력해주세요');
    else {
      axios
        .patch('/user/id/', { user_id: changeID })
        .then(response => {
          // setIsOpen(false);
          //window.location.href = '';
        })
        .catch(error => {
          toast.error(error.message);
        });
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
          top: 'calc(50% - 150px)',
          left: 'calc(50% - 190px)',
          right: 'calc(50% - 190px)',
          bottom: 'calc(50% - 150px)',
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
      <header>Will you Change User_ID of @{user_id}?</header>
      <br />
      <div>
        유저 아이디는 중복될 수 없습니다. 4~15자 이내의 새 아이디로 변경할 수
        있습니다.
      </div>
      <br />
      <footer>
        <div>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.stopPropagation();
              e.preventDefault();
              handleIDPatch();
            }}
          >
            <input
              onChange={e => {
                setChangeID(e.target.value.replace(/[^A-Za-z0-9]/gi, ''));
              }}
              className={styles.Input}
              value={changeID}
              placeholder="new User_id"
              type="text"
              maxLength={15}
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
    </Modal>
  );
};
export default EditIDModal;
