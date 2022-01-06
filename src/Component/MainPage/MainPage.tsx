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

  const formatScrollHeight = (
    presentScrollTop: number,
    presentRightScrollTop: number,
  ): number => {
    return presentRightScrollTop - (lastScrollTop - presentScrollTop) / 3;
  };

  const handleLoadNext = _.throttle(() => {
    console.log(mainRef.current?.scrollTop);
    console.log(mainRef.current?.scrollHeight);
    console.log(mainRef.current?.clientHeight);
  }, 1000);

  useEffect(() => {
    let throttled = false;
    mainRef.current?.addEventListener('scroll', handleLoadNext);
    return () => {
      mainRef.current?.removeEventListener('scroll', handleLoadNext);
    };
  });

  const handleScroll = () => {
    console.log('작동');
    if (mainRef.current !== null) {
      setLastScrollTop(mainRef.current?.scrollTop);
      rightRef.current?.scrollTo(
        0,
        formatScrollHeight(
          mainRef.current?.scrollTop,
          rightRef.current?.scrollTop,
        ),
      );
    }
  };

  return (
    <>
      <div className={styles.MainPage} ref={mainRef}>
        <LeftBlock />
        <MainBlock loadNext={loadNext} />
        <RightBlock rightRef={rightRef} />
      </div>
    </>
  );
}

export default MainPage;
