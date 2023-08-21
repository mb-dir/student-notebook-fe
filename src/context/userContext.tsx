import { FC, ReactNode, createContext, useState } from "react";

interface IUserProviderProps {
  children: ReactNode;
}

export type User = {
  token: string;
  username: string;
  email: string;
};

interface IUserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<IUserContextType | null>(null);

export const UserProvider: FC<IUserProviderProps> = ({
  children,
}: IUserProviderProps) => {
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

  const contextValue: IUserContextType = {
    user,
    login,
    logout,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
