import React, { useEffect, useState } from 'react';
import styles from './SearchPage.module.scss';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Tweet, { TweetType } from '../../../Reused/Tweet/Tweet';
import { useUserContext } from '../../../../UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

import SearchPageHeader from './SearchPageHeader/SearchPageHeader';
import queryString from 'query-string';
import { divide } from 'lodash';
import Follow from '../../../Reused/Follow/Follow';
import { TweetData } from '../../../Reused/Tweet/Tweet';
import Follower from '../../../Reused/Follower/Follower';
import { User } from '../FollowPage/FollowPage';

interface Props {
  loadAgain: boolean;
  setLoadAgain: (boolean: boolean) => void;
  loadNext: boolean;
}

function SearchPage(props: Props) {
  const userContext = useUserContext();
  const navigate = useNavigate();
  const [isChosen, setIsChosen] = useState('top');

  const [tops, setTops] = useState<JSX.Element[]>([]);
  const [latestes, setLatestes] = useState<JSX.Element[]>([]);
  const [people, setPeople] = useState<JSX.Element[]>([]);

  const [topPage, setTopPage] = useState<number | null>(1);
  const [latestPage, setLatestPage] = useState<number | null>(1);
  const [peoplePage, setPeoplePage] = useState<number | null>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const query = queryString.parse(location.search);

  const getSearchData = () => {
    switch (isChosen) {
      case 'top':
        axios
          .get(`/search/${isChosen}/?query=${query?.q}&page=${topPage}`)
          .then(response => {
            console.log(response.data.results);
            setTops([
              ...tops,
              response.data.results.map((TweetData: TweetData['TweetType']) => {
                return (
                  <Tweet
                    setLoadAgain={props.setLoadAgain}
                    loadAgain={props.loadAgain}
                    key={TweetData.id}
                    item={TweetData}
                  />
                );
              }),
            ]);
            setTopPage(response.data.next);
            console.log(tops);
          })
          .catch(err => {
            console.log(err);
          });
        break;
      case 'latest':
        axios
          .get(`/search/${isChosen}/?page=${latestPage}&query=${query?.q}`)
          .then(response => {
            console.log(response.data.results);
            setLatestes([
              ...latestes,
              response.data.results.map((TweetData: TweetData['TweetType']) => {
                return (
                  <Tweet
                    setLoadAgain={props.setLoadAgain}
                    loadAgain={props.loadAgain}
                    key={TweetData.id}
                    item={TweetData}
                  />
                );
              }),
            ]);
            setLatestPage(response.data.next);
            console.log(tops);
          })
          .catch(err => {
            console.log(err);
          });
        break;
      case 'people':
        axios
          .get(`/search/${isChosen}/?page=${peoplePage}&query=${query?.q}`)
          .then(response => {
            setPeople([
              ...people,
              response.data.results.map((follow: User) => {
                return (
                  <li style={{ listStyle: 'none' }} key={follow.id}>
                    <Follower
                      i_follow={follow.i_follow}
                      bio={follow.bio}
                      img={follow.profile_img}
                      id={follow.user_id}
                      follows_me={follow.follows_me}
                      name={follow.username}
                    />
                  </li>
                );
              }),
            ]);
            setPeoplePage(response.data.next);
          })
          .catch(err => {
            console.log(err);
          });
        break;
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getSearchData();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    getSearchData();
  }, [isChosen, props.loadNext]);

  if (isLoading) {
    return (
      <div className={styles.SearchPage}>
        <SearchPageHeader setIsChosen={setIsChosen} isChosen={isChosen} />
        <div className={styles.Loading}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  } else {
    switch (isChosen) {
      case 'top':
        return (
          <div className={styles.allWrapper}>
            <div className={styles.SearchPage}>
              <SearchPageHeader setIsChosen={setIsChosen} isChosen={isChosen} />
              {tops}
            </div>
          </div>
        );
        break;
      case 'latest':
        return (
          <div className={styles.SearchPage}>
            <SearchPageHeader setIsChosen={setIsChosen} isChosen={isChosen} />
            {latestes}
          </div>
        );
        break;
      case 'people':
        return (
          <div className={styles.SearchPage}>
            <SearchPageHeader setIsChosen={setIsChosen} isChosen={isChosen} />
            {people}
          </div>
        );
        break;
      case 'photos':
        return (
          <div className={styles.SearchPage}>
            <SearchPageHeader setIsChosen={setIsChosen} isChosen={isChosen} />
          </div>
        );
        break;
      case 'videos':
        return (
          <div className={styles.SearchPage}>
            <SearchPageHeader setIsChosen={setIsChosen} isChosen={isChosen} />
          </div>
        );
        break;
      default:
        return <div></div>;
    }
  }
}

export default SearchPage;
