"use client";
import {
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
        <ButtonWithIcon
          onClick={() => {
            if (isVideoOn) {
              disableVideo();
            } else {
              enableVideo();
            }
          }}
        >
          {isVideoOn ? BasicIcons.on.cam : BasicIcons.off.cam}
        </ButtonWithIcon>
        <ButtonWithIcon
          onClick={() => {
            if (isAudioOn) {
              disableAudio();
            } else {
              enableAudio();
            }
          }}
        >
          {isAudioOn ? BasicIcons.on.mic : BasicIcons.off.mic}
        </ButtonWithIcon>
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
