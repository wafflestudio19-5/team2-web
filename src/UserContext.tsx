import {useContext, createContext, useState, Dispatch} from "react";
import React from "react"
const userContext = createContext({
    nowUserID: localStorage.getItem("user_id"),
    setNowUserID: (state: string) => {}
});

export const UserContextProvider = ({ children } : {children: React.ReactNode}  ) => {
    const [nowUserID, setNowUserID] = useState(localStorage.getItem("user_id"))
    return (
        <userContext.Provider
            value={{
                nowUserID,
                setNowUserID,
            }}
        >
            {children}
        </userContext.Provider>
    );
};

export const useUserContext = () => useContext(userContext);
