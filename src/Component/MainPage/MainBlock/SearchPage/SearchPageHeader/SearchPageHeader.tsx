import React, { useRef, useState } from 'react';
import styles from './SearchPageHeader.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import arrow_left from '../../../../../Images/arrow-left.svg';
import Magnifier from '../../../../../Images/magnifier.svg';
import queryString from 'query-string';
import qs from 'query-string';

interface Props {
  isChosen: string;
  setIsChosen: (value: string) => void;
}

function SearchPageHeader(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const params = new URLSearchParams(location.search);
  const inputRef = useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (typeof query.q == 'string') {
      if (query.q == 'undefined') setSearchInput('');
      else setSearchInput(query.q);
    }
    if (query.f == 'undefined' || query.f == undefined) switchToTop();
    else {
      if (typeof query.f == 'string') props.setIsChosen(query.f);
    }
  }, []);
  const [searchInput, setSearchInput] = useState<string>('');
  const switchToTop = () => {
    props.setIsChosen('top');
    params.set('f', 'top');
    navigate({
      pathname: '/search/',
      search: `?q=${query.q}&f=top`,
    });
  };
  const switchToLatest = () => {
    props.setIsChosen('latest');
    navigate({
      pathname: '/search/',
      search: `?q=${query.q}&f=latest`,
    });
  };
  const switchToPeople = () => {
    props.setIsChosen('people');
    navigate({
      pathname: '/search/',
      search: `?q=${query.q}&f=people`,
    });
  };
  const switchToPhotos = () => {
    props.setIsChosen('photos');
    navigate({
      pathname: '/search/',
      search: `?q=${query.q}&f=photos`,
    });
  };
  const switchToVideos = () => {
    props.setIsChosen('videos');
    navigate({
      pathname: '/search/',
      search: `?q=${query.q}&f=videos`,
    });
  };

  return (
    <div className={styles.SearchPageHeader}>
      <header className={styles.SearchPageHeaderUp}>
        <img
          className={styles.SearchPageHeaderButton}
          src={arrow_left}
          width={25}
          height={25}
          alt="back"
          onClick={() => {
            navigate(-1);
          }}
        />
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
            ref={inputRef}
            value={searchInput}
            onChange={e => {
              setSearchInput(e.target.value);
            }}
          />
        </form>
      </header>
      <div className={styles.SearchPageRouterButtonWrapper}>
        {props.isChosen === 'top' ? (
          <button
            className={styles.SearchPageRouterButtonClicked}
            onClick={switchToTop}
          >
            Top
          </button>
        ) : (
          <button
            className={styles.SearchPageRouterButtonUnclicked}
            onClick={switchToTop}
          >
            Top
          </button>
        )}
        {props.isChosen === 'latest' ? (
          <button
            className={styles.SearchPageRouterButtonClicked}
            onClick={switchToLatest}
          >
            Latest
          </button>
        ) : (
          <button
            className={styles.SearchPageRouterButtonUnclicked}
            onClick={switchToLatest}
          >
            Latest
          </button>
        )}
        {props.isChosen === 'people' ? (
          <button
            className={styles.SearchPageRouterButtonClicked}
            onClick={switchToPeople}
          >
            People
          </button>
        ) : (
          <button
            className={styles.SearchPageRouterButtonUnclicked}
            onClick={switchToPeople}
          >
            People
          </button>
        )}
        {props.isChosen === 'photos' ? (
          <button
            className={styles.SearchPageRouterButtonClicked}
            onClick={switchToPhotos}
          >
            Photos
          </button>
        ) : (
          <button
            className={styles.SearchPageRouterButtonUnclicked}
            onClick={switchToPhotos}
          >
            Photos
          </button>
        )}
        {props.isChosen === 'videos' ? (
          <button
            className={styles.SearchPageRouterButtonClicked}
            onClick={switchToVideos}
          >
            Videos
          </button>
        ) : (
          <button
            className={styles.SearchPageRouterButtonUnclicked}
            onClick={switchToVideos}
          >
            Videos
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchPageHeader;
