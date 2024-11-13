import { CheckMentionConfig, MentionSelectItemType } from "../../editor";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MentionManager } from "../../instants";

type MentionProviderState = {
  mentions: MentionSelectItemType[];
  setMentions: (mentions: MentionSelectItemType[]) => void;
  activeValue: string | undefined;
  setActiveValue: (value: string | undefined) => void;
  checkMentionConfig: CheckMentionConfig | undefined;
  setCheckMentionConfig: (config: CheckMentionConfig | undefined) => void;
};
const initialState: MentionProviderState = {
  mentions: [],
  activeValue: undefined,
  setMentions: () => null,
  setActiveValue: () => null,
  checkMentionConfig: undefined,
  setCheckMentionConfig: () => null,
};
const MentionProviderContext =
  createContext<MentionProviderState>(initialState);
interface MentionProviderProps {
  children?: ReactNode;
  defaultMentions?: MentionSelectItemType[];
}
const MentionProvider = (props: MentionProviderProps) => {
  const { children, defaultMentions = [] } = props;
  const [mentions, setMentions] =
    useState<MentionSelectItemType[]>(defaultMentions);
  const [activeValue, setActiveValue] = useState<string | undefined>(undefined);
  const [checkMentionConfig, setCheckMentionConfig] = useState<
    CheckMentionConfig | undefined
  >(undefined);
  useEffect(() => {
    if (mentions.length > 0) {
      setActiveValue(MentionManager.getFirstMention()?.value);
    }
  }, [mentions]);
  const value: MentionProviderState = {
    mentions,
    activeValue: activeValue,
    checkMentionConfig,
    setCheckMentionConfig,
    setMentions: (_mentions) => {
      setMentions(_mentions);
      MentionManager.setMentions(_mentions);
    },
    setActiveValue,
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
