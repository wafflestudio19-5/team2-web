import React from "react";
import {
    Route,
    BrowserRouter,
    Navigate,
    Routes,
} from "react-router-dom";
import UserProfile from "./UserProfile/UserProfile";
import TweetsAndReplies from "./TweetsAndReplies/TweetsAndReplies";
import Media from "./Media/Media";
import Likes from "./Likes/Likes";

function ProfilePage ():any {
    if(1){ //사용자 아이디 존재 시 - get 여부 확인
        return (
            <div>
                <UserProfile></UserProfile>
                <BrowserRouter>
                    <Route path="/:id/Tweets" element={<ProfilePage/>}/>
                    <Route path="/:id/TweetsAndReplies" element={<TweetsAndReplies/>}/>
                    <Route path="/:id/Media" element={<Media/>}/>
                    <Route path="/:id/Likes" element={<Likes/>}/>
                </BrowserRouter>
            </div>

        )
    }
    if(null){ //사용자 아이디 없을 시
        return (
            null
            //<ErrorPage/>
            /*에러페이지 리턴*/
        )
    }


}

export default ProfilePage;