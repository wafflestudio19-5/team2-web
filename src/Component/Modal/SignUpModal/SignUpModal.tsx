import styles from './SignUpModal.module.scss';


import Modal from "react-modal";
import X from "../../../Images/X.svg";
import twitter from "../../../Images/twitter-logo-01282021/Twitter logo/SVG/Logo blue.svg";
import KaKaoLogin from "../../../Images/kakao_login.png";
import React, {MouseEventHandler, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useNetworkContext} from "../../../Auth/AuthContext";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../UserContext";
import {toast} from "react-toastify";


interface props {
    isOpen: boolean;
    setSignUpIsOpen: (boolean: boolean) => void;
}

interface ServerResponse {
  success: boolean;
  token: string;
}

function SignUpModal(props: props) {
/**/
    const [emailUse, setEmailUse] = useState(true);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone_number: "",
        birth_date: "",
        password: "",
        user_id: "",
        bio: "null",
    })

    const userContext = useUserContext();
    const Navigate = useNavigate();
    const networkContext = useNetworkContext();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData, [e.target.name]: e.target.value
        })
    }
    const onClick = () => {
        axios
            .post<{ success: boolean }>("/signup/", userData, {headers:{Authorization:''}}
            )
            .then((response: AxiosResponse<any>) => {
                localStorage.setItem("JWT", response.data.token);
                localStorage.setItem("user_id", response.data.user_id)
                networkContext.setToken(response.data.token);
                props.setSignUpIsOpen(false);
                userContext.setNowUserID(response.data.user_id)
                Navigate('/');
            })
            .catch((error) => {
                toast.error("올바른 입력정보가 아닙니다.")
            })
    }
    return (
        <Modal ariaHideApp={false}
               isOpen={props.isOpen} style={{
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
        }}>
            <div className={styles.ModalWrapper}>
                <header className={styles.ModalHeader}>
                    <div onClick={() => {
                        props.setSignUpIsOpen(false)
                    }} className={styles.XWrapper}><img src={X} width={25} height={25} alt="no img"/></div>
                    <div className={styles.LogoWrapper}><img src={twitter} width={30} height={30} alt="no img"/></div>
                    <div/>
                </header>
                <div className={styles.ModalContent}>
                    <span className={styles.ContentMessage}>계정을 생성하세요</span>
                    <form className={styles.InputWrapper}>
                        <input onChange={onChange} className={styles.Input} name={"username"} placeholder="이름"
                               type="text"/>
                        <input onChange={onChange} className={styles.Input} name={emailUse ? "email" : "phone_number"}
                               placeholder={emailUse ? "이메일" : "휴대폰"} type="text"/>
                        <input onChange={onChange} className={styles.Input} name={"user_id"} placeholder="아이디"
                               type="text"/>
                        <input onChange={onChange} className={styles.Input} name={"password"} placeholder="비밀번호"
                               type="password"/>
                    </form>
                    <span onClick={() => {
                        setUserData({...userData, [emailUse ? "email" : "phone_number"]: ''});
                        setEmailUse(!emailUse);
                    }} className={styles.EmailOrPhone}>{emailUse ? "대신 휴대폰 사용하기" : "대신 이메일 사용하기"}</span>
                    <div className={styles.BirthdayNotificationWrapper}>
                        <span className={styles.BirthdayNotificationHeader}>생년월일</span>
                        <br/>
                        <span className={styles.BirthdayNotificationContent}>
                            이 정보는 공개적으로 표시되지 않습니다. 비즈니스,
                            반려동물 등 계정 주제에 상관 없이
                            나의 연령을 확인하세요.
                        </span>
                    </div>
                    <div className={styles.BirthdayInputWrapper}>
                        <input onChange={onChange} name={"birth_date"} className={styles.BirthdayInput} type="date"/>
                    </div>

                    <button onClick={onClick} className={styles.BlackButton}>다음</button>
                </div>
             </div>
    </Modal>
  );
}

export default SignUpModal;
