"use client";
import {
  useDataMessage,
  useLocalAudio,
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import { Button } from "@/components/ui/button";
import { BasicIcons } from "@/utils/BasicIcons";
import { useStudioState } from "@/store/studioState";
import ButtonWithIcon from "./ui/buttonWithIcon";
import ChangeDevice from "./changeDevice";
import { Role } from "@huddle01/server-sdk/auth";
import { useState } from "react";
import { PeerMetadata } from "@/utils/types";

const BottomBar = () => {
  const { isAudioOn, enableAudio, disableAudio } = useLocalAudio();
  const { isVideoOn, enableVideo, disableVideo } = useLocalVideo();
  const { sendData } = useDataMessage();
  const { leaveRoom, room } = useRoom();
  const { role, metadata } = useLocalPeer<PeerMetadata>();
  const { peerIds } = usePeerIds({ roles: [Role.HOST, Role.CO_HOST] });
  const [isRequestSent, setIsRequestSent] = useState(false);

  const {
    isChatOpen,
    setIsChatOpen,
    isMediaOpen,
    setIsMediaOpen,
    isParticipantsOpen,
    setIsParticipantsOpen,
    isRecording,
    setIsRecording,
    isUploading,
  } = useStudioState();

  const handleRecording = async () => {
    if (isRecording) {
      const stopRecording = await fetch(
        `/rec/stopRecording?roomId=${room.roomId}`
      );
      const res = await stopRecording.json();
      if (res) {
        setIsRecording(false);
      }
    } else {
      const startRecording = await fetch(
        `/rec/startRecording?roomId=${room.roomId}`
      );
      const { msg } = await startRecording.json();
      if (msg) {
        setIsRecording(true);
      }
    }
  };

  return (
    <footer className="flex items-center justify-between p-4">
      {role === Role.HOST || role === Role.SPEAKER || role === Role.CO_HOST ? (
        <Button
          className="flex gap-2 bg-red-500 hover:bg-red-400 text-white text-md font-semibold"
          onClick={handleRecording}
        >
          {isUploading ? BasicIcons.spin : BasicIcons.record}{" "}
          {isRecording ? (isUploading ? "Uploading..." : "Stop") : "Record"}
        </Button>
      ) : (
        <Button
          onClick={() => {
            sendData({
              to: peerIds,
              payload: metadata?.displayName || "",
              label: "requestForMainStage",
            });
            setIsRequestSent(true);
            setTimeout(() => {
              setIsRequestSent(false);
            }, 3000);
          }}
        >
          {isRequestSent
            ? "Request Sent for Main Stage"
            : "Request for Main Stage"}
        </Button>
      )}
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
