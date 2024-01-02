import { useDevices } from "@huddle01/react/hooks";
import React, { useEffect, useRef } from "react";
import AudioRecorder from "../Recorder/AudioRecorder";

interface IAudioProps {
  stream: MediaStream;
  name: string;
}

type HTMLAudioElementWithSetSinkId = HTMLAudioElement & {
  setSinkId: (id: string) => void;
};

const Audio: React.FC<
  IAudioProps &
    React.DetailedHTMLProps<
      React.AudioHTMLAttributes<HTMLAudioElementWithSetSinkId>,
      HTMLAudioElementWithSetSinkId
    >
> = ({ stream, name }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { preferredDevice: audioOutputDevice } = useDevices({
    type: "speaker",
  });

  useEffect(() => {
    const audioObj = audioRef.current;

    if (audioObj && stream) {
      audioObj.srcObject = stream;
      audioObj.onloadedmetadata = async () => {
        console.warn("audioCard() | Metadata loaded...");
        try {
          await audioObj.play();
        } catch (error) {
          console.error(error);
        }
      };
      audioObj.onerror = () => {
        console.error("audioCard() | Error is hapenning...");
      };
    }
  }, []);

  useEffect(() => {
    const audioObj = audioRef.current as HTMLAudioElementWithSetSinkId;
    if (audioObj && audioOutputDevice) {
      audioObj.setSinkId(audioOutputDevice.deviceId);
    }
  }, [audioOutputDevice]);

  return (
    <>
      <audio ref={audioRef}>Audio</audio>
      <AudioRecorder stream={stream} name={name} />
    </>
  );
};

export default Audio;
