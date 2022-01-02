import React from 'react';

import {BeatLoader} from "react-spinners";
import axios from "axios";
import {useNetworkContext} from "./AuthContext";
import {useNavigate} from "react-router-dom";

const instance = axios.create({
    baseURL: 'https://clonetwitter.shop'
});

function KakaoAuthRedirect() {
    const Navigate = useNavigate();
    const networkContext = useNetworkContext();
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    React.useEffect(()=>{
        instance.get('/oauth/callback/kakao/?code='+code)
            .then((response)=>{
                networkContext.setToken(response.data.token);
                Navigate('/' + response.data.user_id);
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }, [])
    return (
        <div style={{position: 'absolute',
            top: '50px',
            left: '40%',
            right: '40%',
            bottom: '50px',
            display: 'flex',
            justifyContent:'center'
        }}>
            <BeatLoader loading={true}></BeatLoader>
        </div>
    );

}

export default KakaoAuthRedirect;
