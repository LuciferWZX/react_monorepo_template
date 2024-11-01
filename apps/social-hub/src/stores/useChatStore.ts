import { Conversation } from "wukongimjssdk";
import { create } from "zustand";

export interface ChatStoreState {
  conversations: Conversation[];
}
const initialState: ChatStoreState = {
  conversations: [],
};
export const useChatStore = create<ChatStoreState>(() => {
  return {
    ...initialState,
  };
});
