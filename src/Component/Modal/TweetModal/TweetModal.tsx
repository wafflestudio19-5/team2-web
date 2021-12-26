import styles from './TweetModal.module.scss';
import Modal from 'react-modal';

interface TweetModalProps {
  isTweetModalOpen: boolean;
  setIsTweetModalOpen: (value: boolean) => void;
}

const TweetModal = ({
  isTweetModalOpen,
  setIsTweetModalOpen,
}: TweetModalProps) => {
  return (
    <Modal isOpen={isTweetModalOpen}>
      <div>이재민</div>
    </Modal>
  );
};

export default TweetModal;
