import React from "react";
import RightBlock from "./RightBlock/RightBlock";
import ProfilePage from "./ProfilePage/ProfilePage";
import {
    Route,
    BrowserRouter,
    Navigate,
    Routes,
} from "react-router-dom";
function MainBlock() {
    return (
        <div>
            <RightBlock/>
            <BrowserRouter>
                <Routes>
                    {/*<Route path="/home" component={HomePage} exact />
                    <Route path="/notifications" component={NotificationsPage} exact /> 요기는 나중에 구현.*/}
                    <Route path="/:id" element={<ProfilePage/>}/>
                </Routes>
            </BrowserRouter>
            <ProfilePage/>
        </div>
    )
}

export default MainBlock;