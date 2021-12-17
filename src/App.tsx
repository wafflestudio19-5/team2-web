import styles from './App.module.scss';
import React from 'react';
import {
    Route,
    BrowserRouter,
    Navigate,
    Routes,
} from "react-router-dom";

import MainPage from "./Component/MainPage/MainPage";
import ModalContainer from "./Component/ModalContainer/ModalContainer";
import LoginPage from "./Component/LoginPage/LoginPage";


function App() {
    if(1){ //로그인 안 된 경우
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/> {/*: <Navigate to={"/"}/> 가 element의 인자로 들어가야함.*/}
                    </Routes>
                </BrowserRouter>
                <ModalContainer/>
            </div>
        )
    }
    else {
        return (
            <div>ㅇㅇ</div>
        )
    }

    /*if(1){ //로그인 된 경우
        return (
            <div>
                <MainPage/>
                <ModalContainer/>
            </div>
        )
    }*/
}

export default App;
