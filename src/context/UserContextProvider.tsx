import React from "react";
import { createContext } from "react";

interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  userName: string | null;
  setUserName: (name: string | null) => void;
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
  const [userId, setUserId] = React.useState<string | null>("null");
  const [userName, setUserName] = React.useState<string | null>(null);

  const value = {
    userId,
    setUserId,
    userName,
    setUserName,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
