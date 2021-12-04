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

function ProfilePage() {
    if(사용자 아이디 존재 시 - get 여부 확인){
        return (
            <div>
                <UserProfile></UserProfile>
                <BrowserRouter>
                    <Route path="/:id/Tweets" component={ProfilePage}/>
                    <Route path="/:id/TweetsAndReplies" component={TweetsAndReplies}/>
                    <Route path="/:id/Media" component={Media}/>
                    <Route path="/:id/Likes" component={Likes}/>
                </BrowserRouter>
            </div>

        )
    }
    if(사용자 아이디 없을 시 ){
        return (
            <ErrorPage />
            /*에러페이지 리턴*/
        )
    }


}

export default ProfilePage;