import {useContext, createContext, useState, Dispatch, useEffect} from "react";
import React from "react"
const userContext = createContext({
    nowUserID: '',
    setNowUserID: (state: string) => {}
});

export const UserContextProvider = ({ children } : {children: React.ReactNode}  ) => {
    const [nowUserID, setNowUserID] = useState(localStorage.user_id);

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
