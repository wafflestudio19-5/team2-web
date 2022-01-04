import React from 'react';
import { Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile';
import Tweets from './Tweets/Tweets';
import TweetsAndReplies from './TweetsAndReplies/TweetsAndReplies';
import Media from './Media/Media';
import Likes from './Likes/Likes';
import styles from './ProfilePage.module.scss';
import { useState } from 'react';

function ProfilePage(): any {
  const [isChosen, setIsChosen] = useState<string>('tweets');

  //사용자 아이디 존재 시 - get 여부 확인
  return (
    <div className={styles.ProfilePage}>
      <UserProfile isChosen={isChosen} setIsChosen={setIsChosen} />
      <Routes>
        <Route path="/" element={<Tweets />} />
        <Route path="/with_replies" element={<TweetsAndReplies/>} />
        <Route path="/media" element={<Media />} />
        <Route path="/likes" element={<Likes />} />        
      </Routes>
    </div>
  );

}

export default ProfilePage;

/*
{isChosen == "Tweets" ? <Tweets /> : (
                    isChosen == "TweetsAndReplies" ? <TweetsAndReplies /> : (
                        isChosen == "Media" ? <Media /> : (
                            <Likes />
                        )))
                }

*/

/*
return (
            <div className={styles.ProfilePage}>
                <UserProfile/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/:id/Tweets" element={<ProfilePage />} />
                        <Route path="/:id/TweetsAndReplies" element={<TweetsAndReplies />} />
                        <Route path="/:id/Media" element={<Media />} />
                        <Route path="/:id/Likes" element={<Likes />} />
                    </Routes>
                </BrowserRouter>
            </div>

        )
*/
