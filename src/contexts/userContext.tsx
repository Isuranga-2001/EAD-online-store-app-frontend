import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, UserType } from "@/interfaces/userInterface";

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 1,
    name: "Sankha Bimsara",
    email: "sankha@gmail.com",
    type: UserType.USER,
    phone: "0712345678",
    country: "Sri Lanka",
    postalCode: 10250,
    createdAt: "2021-08-13T09:00:00Z",
    updatedAt: "2021-08-13T09:00:00Z",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
