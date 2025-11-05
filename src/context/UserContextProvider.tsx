import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  uid: number;
  uname: string;
  exp: number;
  iat: number;
}

interface UserContextType {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPose: string | null;
  setPose: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  userName: null,
  setUserName: () => {},
  selectedPose: null,
  setPose: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedPose, setPose] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          // Token valid — restore session
          setUserId(String(decoded.uid));
          setUserName(decoded.uname);
        } else {
          // Token expired — cleanup
          console.warn("JWT expired. Clearing localStorage...");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid JWT:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  

  const value = {
    userId,
    setUserId,
    userName,
    setUserName,
    selectedPose,
    setPose,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
