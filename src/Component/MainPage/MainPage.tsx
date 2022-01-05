import styles from './MainPage.module.scss';
import LeftBlock from './LeftBlock/LeftBlock';
import MainBlock from './MainBlock/MainBlock';
import RightBlock from './RightBlock/RightBlock';
import _ from 'lodash';
import { useRef, useState } from 'react';

const MainPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [loadNext, setLoadNext] = useState<boolean>(false);

  const handleOnscroll = _.throttle(() => {
    if (
      divRef.current !== null &&
      divRef.current?.scrollHeight -
        divRef.current?.scrollTop -
        divRef.current?.clientHeight <
        500
    ) {
      setLoadNext(true);
    } else {
      setLoadNext(false);
    }
  }, 500);

  return (
    <div className={styles.MainPage} onScroll={handleOnscroll} ref={divRef}>
      <LeftBlock />
      <MainBlock loadNext={loadNext} />
      <RightBlock />
    </div>
  );
};

export default MainPage;
