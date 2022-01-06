import { useContext, createContext, useState, Dispatch } from 'react';
import React from 'react';
const networkContext = createContext({
  token: localStorage.JWT,
  setToken: (state: string) => {},
});
export const NetworkContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
