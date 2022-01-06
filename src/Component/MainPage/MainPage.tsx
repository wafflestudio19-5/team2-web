import styles from './MainPage.module.scss';
import LeftBlock from './LeftBlock/LeftBlock';
import MainBlock from './MainBlock/MainBlock';
import RightBlock from './RightBlock/RightBlock';

function MainPage() {
  return (
    <div className={styles.MainPage}>
      <LeftBlock />
      <MainBlock />
      <RightBlock />
    </div>
  );
}

export default MainPage;
