import styles from './App.module.scss';
import React from 'react';
import {
    Route,
    BrowserRouter,
    Navigate,
    Routes,
} from "react-router-dom";
import LoginPage from "./Component/LoginPage/LoginPage";
import MainPage from "./Component/MainPage/MainPage";
import ModalContainer from "./Component/ModalContainer/ModalContainer";


function App() {
    if(로그인 안되어있으면){
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" component={LoginPage} exact/>
                    <Navigate to={"/"}/>
                </Routes>
            </BrowserRouter>
        )
    }

    if(로그인 되었으면){
        return (
            <MainPage/>
        )
    }
    <ModalContainer/>
}

export default App;
