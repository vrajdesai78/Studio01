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
  audioInputDevice: MediaDeviceInfo;
  setAudioInputDevice: (audioInputDevice: MediaDeviceInfo) => void;
  videoDevice: MediaDeviceInfo;
  setVideoDevice: (videoDevice: MediaDeviceInfo) => void;
  audioOutputDevice: MediaDeviceInfo;
  setAudioOutputDevice: (audioOutputDevice: MediaDeviceInfo) => void;
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
}));
