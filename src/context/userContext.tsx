import { FC, ReactNode, createContext, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}

export type User = {
  token: string;
  username: string;
  email: string;
};

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<UserProviderProps> = ({
  children,
}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    const user: User = storedUser ? JSON.parse(storedUser) : null;

    if (!!user) {
      return user;
    } else {
      return null;
    }
  });

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
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
