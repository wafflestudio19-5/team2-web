import styles from './RightBlock.module.scss';
import Magnifier from '../../../Images/magnifier.svg';
import Setting from '../../../Images/setting.svg';
import Trend from './Trend';
import SideFollow from './SideFollow';
import React, { RefObject, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

interface Props {
  rightRef: RefObject<HTMLDivElement>;
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
}

interface recommendData {
  user_id: string;
  username: string;
  profile_img: string;
}

const dummyData = [
  { user_id: 'ABC', username: '이하동', profile_img: 'none' },
  { user_id: 'ABC', username: '이하동', profile_img: 'none' },
];
const RightBlock = ({ rightRef, loadAgain, setLoadAgain }: Props) => {
  const [recommendData, setRecommendData] = useState<recommendData[]>([
    { user_id: '', username: '', profile_img: '' },
    { user_id: '', username: '', profile_img: '' },
    { user_id: '', username: '', profile_img: '' },
  ]);
  const dummyData = [
    { user_id: 'ABC', username: '이하동', profile_img: 'none' },
    { user_id: 'ABC', username: '이하동', profile_img: 'none' },
    { user_id: 'ABC', username: '이하동', profile_img: 'none' },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const query = queryString.parse(location.search);
  React.useEffect(() => {
    axios
      .get('/recommend/')
      .then(response => {
        setRecommendData(response.data);
      })
      .catch(error => {
        toast.error(error); //.response.data.message
        setRecommendData(dummyData);
      });
  }, []);
  React.useEffect(() => {
    if (typeof query.q == 'string') setSearchInput(query.q);
  }, []);
  const [searchInput, setSearchInput] = useState<string>('');
  return (
    <div className={styles.RightBlock}>
      <div className={styles.RightInside} ref={rightRef}>
        <div className={styles.SearchWrapper}>
          <form
            onSubmit={e => {
              if (inputRef.current?.value === '') {
                e.preventDefault();
              } else navigate('/search/');
            }}
            className={styles.SearchLabel}
            action=""
          >
            <div className={styles.MagnifierWrapper}>
              <img
                className={styles.Magnifier}
                src={Magnifier}
                width={'20px'}
                height={'20px'}
                alt="no img"
              />
            </div>
            <input
              className={styles.SearchInput}
              placeholder="Search Twitter"
              type="text"
              name="q"
              value={searchInput}
              ref={inputRef}
              onChange={e => {
                setSearchInput(e.target.value);
              }}
            />
          </form>
        </div>
        <div className={styles.TrendsWrapper}>
          <div className={styles.TrendsInside}>
            <div className={styles.TrendHeader}>
              <span>Trends for you</span>
              <span className={styles.ButtonWrapper}>
                <div>
                  <img src={Setting} width={22} height={22} alt="No img" />
                </div>
              </span>
            </div>
            <Trend text={'서울대학교'}></Trend>
            <Trend text={'와플'}></Trend>
            <Trend text={'React'}></Trend>
            <Trend text={'django'}></Trend>
            <Trend text={'경남 하동군'}></Trend>

            <button className={styles.TrendFooter}>
              <span className={styles.TrendFooterText}>Show more</span>
            </button>
          </div>
        </div>
        <div className={styles.WhoToFollowWrapper}>
          <div className={styles.WhoToFollowInside}>
            <div className={styles.WhoToFollowHeader}>
              <span>Who to follow</span>
            </div>
            <SideFollow
              id={recommendData[0].user_id}
              name={recommendData[0].username}
              img={recommendData[0].profile_img}
            />
            <SideFollow
              id={recommendData[1].user_id}
              name={recommendData[1].username}
              img={recommendData[1].profile_img}
            />
            <SideFollow
              id={recommendData[2].user_id}
              name={recommendData[2].username}
              img={recommendData[2].profile_img}
            />
            <button className={styles.FollowFooter}>
              <span>Show more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBlock;
