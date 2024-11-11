import { MentionItemType } from "../../editor";
import { createContext, ReactNode, useContext, useState } from "react";

type MentionProviderState = {
  mentions: MentionItemType[];
  setMentions: (mentions: MentionItemType[]) => void;
};
const initialState: MentionProviderState = {
  mentions: [],
  setMentions: () => null,
};
const MentionProviderContext =
  createContext<MentionProviderState>(initialState);
interface MentionProviderProps {
  children?: ReactNode;
  defaultMentions?: MentionItemType[];
}
const MentionProvider = (props: MentionProviderProps) => {
  const { children, defaultMentions = [] } = props;
  const [mentions, setMentions] = useState<MentionItemType[]>(defaultMentions);
  const value: MentionProviderState = {
    mentions,
    setMentions,
  };
  return (
    <MentionProviderContext.Provider {...props} value={value}>
      {children}
    </MentionProviderContext.Provider>
  );
};
export const useMention = () => {
  const context = useContext(MentionProviderContext);
  if (!context) {
    throw new Error("useMention must be used within a MentionProvider");
  }
  return context;
};
export default MentionProvider;
