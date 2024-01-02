"use client";
import {
  useDevices,
  useLocalAudio,
  useLocalPeer,
  useLocalVideo,
  useRoom,
} from "@huddle01/react/hooks";
import { Button } from "@/components/ui/button";
import { BasicIcons } from "@/utils/BasicIcons";
import { useStudioState } from "@/store/studioState";
import ButtonWithIcon from "./ui/buttonWithIcon";
import Recorder from "./Recorder/VideoRecorder";
import { PeerMetadata } from "@/utils/types";
import ChangeDevice from "./changeDevice";
import { useEffect } from "react";

const BottomBar = () => {
  const { isAudioOn, enableAudio, disableAudio } = useLocalAudio();
  const { isVideoOn, enableVideo, disableVideo, stream } = useLocalVideo();
  const { leaveRoom } = useRoom();
  const {
    isChatOpen,
    setIsChatOpen,
    isMediaOpen,
    setIsMediaOpen,
    isParticipantsOpen,
    setIsParticipantsOpen,
    isRecording,
    setIsRecording,
  } = useStudioState();

  return (
    <footer className="flex items-center justify-between p-4">
      <Button
        className="flex gap-2 bg-red-500 hover:bg-red-400 text-white text-md font-semibold"
        onClick={() => setIsRecording(!isRecording)}
      >
        {BasicIcons.record} {isRecording ? "Stop" : "Record"}
      </Button>
      <div className="flex space-x-3 ml-8">
        <ChangeDevice deviceType="cam">
          <button
            onClick={() => {
              if (isVideoOn) {
                disableVideo();
              } else {
                enableVideo();
              }
            }}
            className="bg-gray-600/50 p-2.5 rounded-lg"
          >
            {isVideoOn ? BasicIcons.on.cam : BasicIcons.off.cam}
          </button>
        </ChangeDevice>
        <ChangeDevice deviceType="mic">
          <button
            onClick={() => {
              if (isAudioOn) {
                disableAudio();
              } else {
                enableAudio();
              }
            }}
            className="bg-gray-600/50 p-2.5 rounded-lg"
          >
            {isAudioOn ? BasicIcons.on.mic : BasicIcons.off.mic}
          </button>
        </ChangeDevice>
        <ChangeDevice deviceType="speaker">
          <button
            onClick={() => {}}
            className="bg-gray-600/50 p-2.5 rounded-lg"
          >
            {BasicIcons.speaker}
          </button>
        </ChangeDevice>
        <ButtonWithIcon onClick={() => {}}>{BasicIcons.screen}</ButtonWithIcon>
        <ButtonWithIcon onClick={leaveRoom}>{BasicIcons.end}</ButtonWithIcon>
      </div>
      <div className="flex space-x-3">
        <ButtonWithIcon
          onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
        >
          {BasicIcons.people}
        </ButtonWithIcon>
        <ButtonWithIcon onClick={() => setIsChatOpen(!isChatOpen)}>
          {BasicIcons.chat}
        </ButtonWithIcon>
        <ButtonWithIcon onClick={() => setIsMediaOpen(!isMediaOpen)}>
          {BasicIcons.music}
        </ButtonWithIcon>
      </div>
    </footer>
  );
};

export default BottomBar;
