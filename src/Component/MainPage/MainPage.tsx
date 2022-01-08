import styles from './MainPage.module.scss';
import LeftBlock from './LeftBlock/LeftBlock';
import MainBlock from './MainBlock/MainBlock';
import RightBlock from './RightBlock/RightBlock';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';

function MainPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [loadNext, setLoadNext] = useState<boolean>(false);
  const [loadAgain, setLoadAgain] = useState<boolean>(false);
  const formatScrollHeight = (
    presentScrollTop: number,
    presentRightScrollTop: number,
  ): number => {
    return presentRightScrollTop - (lastScrollTop - presentScrollTop) / 3;
  };

  const handleScroll = _.throttle(
    () => {
      if (mainRef.current !== null) {
        setLastScrollTop(mainRef.current?.scrollTop);
        rightRef.current?.scrollTo({
          top: formatScrollHeight(
            mainRef.current?.scrollTop,
            rightRef.current?.scrollTop,
          ),
          behavior: 'smooth',
        });
        if (
          mainRef.current?.scrollHeight -
            mainRef.current?.scrollTop -
            mainRef.current?.clientHeight <
          500
        ) {
          setLoadNext(true);
        } else {
          setLoadNext(false);
        }
      }
    },
    250,
    { leading: false },
  );

  return (
    <>
      <div className={styles.MainPage} ref={mainRef} onScroll={handleScroll}>
        <LeftBlock loadAgain={loadAgain} setLoadAgain={setLoadAgain} />
        <MainBlock
          loadAgain={loadAgain}
          setLoadAgain={setLoadAgain}
          loadNext={loadNext}
        />
        <RightBlock
          loadAgain={loadAgain}
          setLoadAgain={setLoadAgain}
          rightRef={rightRef}
        />
      </div>
    </>
  );
}

export default MainPage;
