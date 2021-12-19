import LeftBlock from "../MainPage/LeftBlock/LeftBlock";
import {BrowserRouter, Routes} from "react-router-dom";
import React from "react";
import KaKaoStart from "../LoginPage/KakaoStart.png";
import Background from "../LoginPage/LoginBackground.png"
import Twitter from "../../Image/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg"
import styles from "./LoginPage.module.scss"

const LoginPage = () => {
    return (
        <div className={styles.LoginPageWrapper}>
            <div className={styles.Left}>
                <img className={styles.Background} src={Background} alt="No Image"/>
            </div>

            <div className={styles.Right}>
                <img src={Twitter} alt="No Image" height={40} width={40}/>
                <div className={styles.Text1}>
                    <span>지금 일어나고 있는 일</span>
                </div>
                <div className={styles.Text2}>
                    <span>오늘 트위터에 가입하세요</span>
                </div>
                <div className={styles.ButtonWrapper}>
                    <button className={styles.Button}>일단 임시</button>
                    <button className={styles.Button} style={{
                        backgroundImage: `url(${KaKaoStart})`,
                        backgroundSize: '100% 100%'
                    }} />
                    <div className={styles.Border}>
                        또는
                    </div>
                    <button className={styles.Button}>일단 임시</button>
                </div>

            </div>
            {/**/}
        </div>
    )
}

export default LoginPage;