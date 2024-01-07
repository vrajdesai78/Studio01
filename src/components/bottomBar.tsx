"use client";
import { useLocalAudio, useLocalVideo, useRoom } from "@huddle01/react/hooks";
import { Button } from "@/components/ui/button";
import { BasicIcons } from "@/utils/BasicIcons";
import { useStudioState } from "@/store/studioState";
import ButtonWithIcon from "./ui/buttonWithIcon";
import ChangeDevice from "./changeDevice";

const BottomBar = () => {
  const { isAudioOn, enableAudio, disableAudio } = useLocalAudio();
  const { isVideoOn, enableVideo, disableVideo, stream } = useLocalVideo();
  const { leaveRoom, room } = useRoom();
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
      <Button
        className="flex gap-2 bg-red-500 hover:bg-red-400 text-white text-md font-semibold"
        onClick={handleRecording}
      >
        {isUploading ? BasicIcons.spin : BasicIcons.record}{" "}
        {isRecording ? (isUploading ? "Uploading..." : "Stop") : "Record"}
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
