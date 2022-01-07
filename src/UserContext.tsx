import {
  useContext,
  createContext,
  useState,
  Dispatch,
  useEffect,
} from 'react';
import React from 'react';
const userContext = createContext({
  nowUserID: '',
  setNowUserID: (state: string) => {},
  isChange: false,
  setIsChange: (state: boolean) => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [nowUserID, setNowUserID] = useState(localStorage.user_id);
  const [isChange, setIsChange] = useState(false);

  return (
    <userContext.Provider
      value={{
        nowUserID,
        setNowUserID,
        isChange,
        setIsChange,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);
