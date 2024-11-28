import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppUser } from "@/types";
interface UserProviderState {
  user: AppUser;
}
const UserProviderContext = createContext<UserProviderState | undefined>(
  undefined,
);

interface UserProviderProps {
  children?: ReactNode;
  user: AppUser;
}
export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<AppUser>(props.user);
  useEffect(() => {
    setUser(user);
  }, [user]);
  const { children } = props;
  return (
    <UserProviderContext.Provider value={{ user }}>
      {children}
    </UserProviderContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserProviderContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
