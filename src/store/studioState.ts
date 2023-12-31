import { create } from "zustand";

export interface IChatMessage {
  name: string;
  text: string;
  isUser: boolean;
}

export interface BoxPosition {
  x: number;
  y: number;
  width: string;
  height: string;
}

interface StudioState {
  name: string;
  setName: (name: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (isChatOpen: boolean) => void;
  isMediaOpen: boolean;
  setIsMediaOpen: (isMediaOpen: boolean) => void;
  isParticipantsOpen: boolean;
  setIsParticipantsOpen: (isParticipantsOpen: boolean) => void;
  audioInputDevice: MediaDeviceInfo;
  setAudioInputDevice: (audioInputDevice: MediaDeviceInfo) => void;
  videoDevice: MediaDeviceInfo;
  setVideoDevice: (videoDevice: MediaDeviceInfo) => void;
  audioOutputDevice: MediaDeviceInfo;
  setAudioOutputDevice: (audioOutputDevice: MediaDeviceInfo) => void;
  showAcceptRequest: boolean;
  setShowAcceptRequest: (val: boolean) => void;
  requestedPeers: string[];
  addRequestedPeers: (val: string) => void;
  removeRequestedPeers: (val: string) => void;
  chatMessages: IChatMessage[];
  addChatMessage: (val: IChatMessage) => void;
  activeBg: string;
  setActiveBg: (val: string) => void;
  boxPosition: BoxPosition;
  setBoxPosition: (val: BoxPosition) => void;
  isRecording: boolean;
  setIsRecording: (val: boolean) => void;
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
  audioInputDevice: {} as MediaDeviceInfo,
  setAudioInputDevice: (audioInputDevice) => set({ audioInputDevice }),
  videoDevice: {} as MediaDeviceInfo,
  setVideoDevice: (videoDevice) => set({ videoDevice }),
  audioOutputDevice: {} as MediaDeviceInfo,
  setAudioOutputDevice: (audioOutputDevice) => set({ audioOutputDevice }),
  showAcceptRequest: false,
  setShowAcceptRequest: (val) => set({ showAcceptRequest: val }),
  requestedPeers: [],
  addRequestedPeers: (val: string) => {
    set((state) => ({
      requestedPeers: [...state.requestedPeers, val],
    }));
  },
  removeRequestedPeers: (val: string) => {
    set((state) => ({
      requestedPeers: state.requestedPeers.filter((peer) => peer !== val),
    }));
  },
  chatMessages: [],
  addChatMessage: (val: IChatMessage) => {
    set((state) => ({
      chatMessages: [...state.chatMessages, val],
    }));
  },
  activeBg: "bg-black",
  setActiveBg: (val: string) => set({ activeBg: val }),
  boxPosition: { x: 0, y: 0, width: "200", height: "200" },
  setBoxPosition: (val: BoxPosition) => set({ boxPosition: val }),
  isRecording: false,
  setIsRecording: (val: boolean) => set({ isRecording: val })
}));
