import styles from './LoginModal.module.scss';
import Modal from "react-modal";
import twitter from "../../../Images/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg"
import X from "../../../Images/X.svg"
import KaKaoLogin from "../../../Images/kakao_login.png"
import React, {useState} from "react";
import {KAKAO_AUTH_URL} from "../../../Auth/KakaoAuth";
import axios from "axios";

interface props {
    isOpen: boolean
    setLoginIsOpen: (boolean: boolean) => void
}

function LoginModal(props: props) {
    const [authData, setAuthData] = useState({
        "id": '', // id 또는 이메일 또는 전화번호
        "password": ''
    })
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setAuthData({
            ...authData, [e.target.name]:e.target.value
        })
    }
    const onSubmit = () => {
        axios.post<{success:boolean}>("/login", authData)
            .then()
    }
    return (
        <Modal ariaHideApp={false}
               style={{
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.3)'
            },
            content: {
                position: 'absolute',
                top: '50px',
                left: '450px',
                right: '450px',
                bottom: '50px',
                border: '1px solid #ccc',
                borderRadius: '20px',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                padding: '0 15px 20px 15px'
            }
        }} isOpen={props.isOpen}>
            <div className={styles.ModalWrapper}>
                <header className={styles.ModalHeader}>
                    <div onClick={() => {
                        props.setLoginIsOpen(false)
                    }} className={styles.XWrapper}><img src={X} width={25} height={25} alt="no img"/></div>
                    <div className={styles.LogoWrapper}><img src={twitter} width={30} height={30} alt="no img"/></div>
                    <div/>
                </header>
                <div className={styles.ModalContent}>
                    <span className={styles.ContentMessage}>트위터에 로그인하기</span>
                    <button className={styles.Button}>Google 계정으로 로그인하기</button>

                    <button className={styles.Button} style={{
                        backgroundImage: `url(${KaKaoLogin})`,
                        backgroundSize: '100% 100%'
                    }}/>

                    <div className={styles.BorderWrapper}>
                        또는
                    </div>
                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        onSubmit();
                    }} className={styles.InputWrapper}>
                        <input onChange={onChange} name={"id"} className={styles.Input} placeholder="휴대폰 번호, 이메일 주소 또는 사용자 아이디" type="text"/>
                        <input onChange={onChange} className={styles.Input} name={"password"} placeholder="비밀번호" type="password"/>
                        <button className={styles.BlackButton}>다음</button>
                    </form>
                </div>
            </div>

        </Modal>
    );
}

export default LoginModal;