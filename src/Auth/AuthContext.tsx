import {useContext, createContext, useState, Dispatch} from "react";
import React from "react"
const networkContext = createContext <{token:string, setToken:Dispatch<any>}> ({
    token:localStorage.JWT, setToken:() =>{} });

export const NetworkContextProvider = ({ children } : {children: React.ReactNode}  ) => {
    const [token, setToken] = useState(localStorage.JWT);

    return (
        <networkContext.Provider
            value={{
                token,
                setToken,
            }}
        >
            {children}
        </networkContext.Provider>
    );
};

export const useNetworkContext = () => useContext(networkContext);