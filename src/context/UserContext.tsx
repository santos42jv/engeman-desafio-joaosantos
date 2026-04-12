import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

type UserContextType = ReturnType<typeof useAuth>;

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};
