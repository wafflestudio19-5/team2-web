import React from 'react';

import {BeatLoader} from "react-spinners";
import axios from "axios";
import {useNetworkContext} from "./AuthContext";
import {useNavigate} from "react-router-dom";



function KakaoAuthRedirect() {
    const Navigate = useNavigate();
    const networkContext = useNetworkContext();
    const code = new URL(window.location.href).searchParams.get("code");
    const user_id = new URL(window.location.href).searchParams.get("user_id");
    React.useEffect(()=>{
                networkContext.setToken(code ? code : '');
                Navigate('/' + user_id);
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
