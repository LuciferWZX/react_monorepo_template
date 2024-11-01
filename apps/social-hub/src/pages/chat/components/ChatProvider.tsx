import { createContext, ReactNode, useContext, useState } from "react";
import { IUser } from "@/types";

interface ChatProviderState {
  user: IUser | null;
  setUser: (_user: IUser | null) => void;
  updateUser: (attr: Record<keyof Omit<IUser, "id">, any>) => void;
}
const initialState: ChatProviderState = {
  user: null,
  setUser: () => null,
  updateUser: () => null,
};
const ChatProviderContext = createContext<ChatProviderState>(initialState);
interface ChatConfigProps {
  children?: ReactNode;
}
export const ChatProvider = (props: ChatConfigProps) => {
  const { children, ...restProps } = props;
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <ChatProviderContext.Provider
      {...restProps}
      value={{
        user: user,
        setUser: (_user) => {
          setUser(_user);
        },
        updateUser: (attr) => {
          if (!user) {
            throw new Error("用户不存在,无法更新用户信息");
          }
          setUser({
            ...user,
            ...attr,
          });
        },
      }}
    >
      {children}
    </ChatProviderContext.Provider>
  );
};
export const useChat = () => {
  const context = useContext(ChatProviderContext);
  if (context === void 0) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
