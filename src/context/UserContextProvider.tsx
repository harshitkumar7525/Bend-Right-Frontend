import React, { createContext, useState } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  userName: null,
  setUserName: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>("null");
  const [userName, setUserName] = useState<string | null>(null);

  const value = {
    userId,
    setUserId,
    userName,
    setUserName,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
