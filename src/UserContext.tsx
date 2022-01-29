import { useContext, createContext, useState } from 'react';
import React from 'react';
import defaultProfileImage from '../src/Images/defaultProfileImage.jpeg';

interface userDataType {
  userID: string;
  profileImageURL: string;
}

interface contextType {
  userData: userDataType;
  setUserData: (props: userDataType) => void;
  setUserDataDefault: () => void;
}

const userContext = createContext<contextType | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<userDataType>({
    userID: '',
    profileImageURL: defaultProfileImage,
  });
  const setUserDataDefault = () => {
    setUserData({
      userID: '',
      profileImageURL: defaultProfileImage,
    });
  };
  return (
    <userContext.Provider value={{ userData, setUserData, setUserDataDefault }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);
