import {useContext, createContext, useState, Dispatch} from "react";
import React from "react"
const networkContext = createContext <{/*kakaoApproveCode:string,setKakaoApproveCode:Dispatch<any>,*/
    token:string, setToken:Dispatch<any>}> ({
    token:localStorage.JWT, setToken:() =>{} /*kakaoApproveCode:'null',setKakaoApproveCode:() =>{}*/ });

export const NetworkContextProvider = ({ children } : {children: React.ReactNode}  ) => {
    const [token, setToken] = useState(localStorage.JWT);
    //const [kakaoApproveCode,setKakaoApproveCode] = useState('null');
    return (
        <networkContext.Provider
            value={{
                token,
                setToken,
                /*kakaoApproveCode,
                setKakaoApproveCode*/
            }}
        >
            {children}
        </networkContext.Provider>
    );
};

export const useNetworkContext = () => useContext(networkContext);