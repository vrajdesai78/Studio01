import { create } from "zustand";

interface StudioState {
  name: string;
  setName: (name: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (isChatOpen: boolean) => void;
  isMediaOpen: boolean;
  setIsMediaOpen: (isMediaOpen: boolean) => void;
  isParticipantsOpen: boolean;
  setIsParticipantsOpen: (isParticipantsOpen: boolean) => void;
}

export const useStudioState = create<StudioState>((set) => ({
  name: "",
  setName: (name) => set({ name }),
  isChatOpen: false,
  setIsChatOpen: (isChatOpen) => {
    set({ isChatOpen });
    set({ isMediaOpen: false });
    set({ isParticipantsOpen: false });
  },
  isMediaOpen: false,
  setIsMediaOpen: (isMediaOpen) => {
    set({ isMediaOpen });
    set({ isChatOpen: false });
    set({ isParticipantsOpen: false });
  },
  isParticipantsOpen: false,
  setIsParticipantsOpen: (isParticipantsOpen) => {
    set({ isParticipantsOpen });
    set({ isChatOpen: false });
    set({ isMediaOpen: false });
  },
}));
