import { createContext } from "react";
interface UserProviderState {
  user;
}
const UserProviderContext = createContext(any);
