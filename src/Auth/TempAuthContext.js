import { useContext, createContext, useState, Dispatch } from 'react';
import React from 'react';
const tmpNetworkContext = createContext();

export const NetworkContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.JWT);
  //const [kakaoApproveCode,setKakaoApproveCode] = useState('null');
  return (
    <tmpNetworkContext.Provider
      value={{
        token,
        setToken,
        /*kakaoApproveCode,
                setKakaoApproveCode*/
      }}
    >
      {children}
    </tmpNetworkContext.Provider>
  );
};

export const useTmpNetworkContext = () => useContext(tmpNetworkContext);
