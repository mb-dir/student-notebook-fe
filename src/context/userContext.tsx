import { createContext, useState, ReactNode, FC, useEffect } from "react";

interface UserProviderProps {
  children: ReactNode;
}

export type User = {
  token: string;
  username: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<UserProviderProps> = ({
  children,
}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user: User = storedUser ? JSON.parse(storedUser) : null;
    if (!!user) login(user);
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue: UserContextType = {
    user,
    login,
    logout,
  };
  console.log(user);
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
