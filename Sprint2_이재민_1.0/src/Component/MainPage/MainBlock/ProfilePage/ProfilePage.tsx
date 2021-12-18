import React from "react";
import {
    Route,
    BrowserRouter,
    Navigate,
    Routes,
} from "react-router-dom";
import UserProfile from "./UserProfile/UserProfile";
import Tweets from "./Tweets/Tweets";
import TweetsAndReplies from "./TweetsAndReplies/TweetsAndReplies";
import Media from "./Media/Media";
import Likes from "./Likes/Likes";
import styles from './ProfilePage.module.scss';
import { useState } from "react";

function ProfilePage(): any {

    const [isChosen, setIsChosen] = useState<string>("Tweets");

    if (isChosen == "Tweets") { //사용자 아이디 존재 시 - get 여부 확인
        return (
            <div className={styles.ProfilePage}>
                <UserProfile {...isChosen} setIsChosen={setIsChosen}/>
                <Tweets/>
            </div>
        )
    }
    else if (isChosen == "TweetsAndReplies") { //사용자 아이디 존재 시 - get 여부 확인
        return (
            <div className={styles.ProfilePage}>
                <UserProfile {...isChosen} setIsChosen={setIsChosen}/>
                <TweetsAndReplies />
            </div>
        )
    }
    else if (isChosen == "Media") { //사용자 아이디 존재 시 - get 여부 확인
        return (
            <div className={styles.ProfilePage}>
                <UserProfile {...isChosen} setIsChosen={setIsChosen}/>
                <Media />
            </div>
        )
    }
    else if (isChosen == "Likes") { //사용자 아이디 존재 시 - get 여부 확인
        return (
            <div className={styles.ProfilePage}>
                <UserProfile {...isChosen} setIsChosen={setIsChosen}/>
                <Likes />
            </div>
        )
    }
    if (null) { //사용자 아이디 없을 시
        return (
            null
            //<ErrorPage/>
            /*에러페이지 리턴*/
        )
    }


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