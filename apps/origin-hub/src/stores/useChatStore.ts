import { Conversation } from "wukongimjssdk";
import { create } from "zustand";
import { StoreActions } from "@/stores/index.ts";
import { subscribeWithSelector } from "zustand/middleware";

export interface ChatStoreState {
  conversation: Conversation | undefined;
  conversations: Conversation[];
}
const initialState: ChatStoreState = {
  conversations: [],
  conversation: undefined,
};
type Action = StoreActions;
export const useChatStore = create(
  subscribeWithSelector<ChatStoreState & Action>((set) => {
    return {
      ...initialState,
      clear: () => set({ ...initialState }),
    };
  }),
);
useChatStore.subscribe(
  (state) => state.conversations,
  (conversations) => {
    if (!useChatStore.getState().conversation && conversations.length > 0) {
      useChatStore.setState({ conversation: conversations[0] });
    }
  },
);
