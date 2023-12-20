import { PeerMetadata } from "@/utils/types";
import {
  useRemoteAudio,
  useRemotePeer,
  useRemoteVideo,
} from "@huddle01/react/hooks";
import { Avatar } from "./ui/avatar";
import { useEffect, useRef } from "react";

interface RemotePeerProps {
  peerId: string;
}

const RemotePeer = ({ peerId }: RemotePeerProps) => {
  const { stream: videoStream } = useRemoteVideo({ peerId });
  const { stream: audioStream } = useRemoteAudio({ peerId });
  const { metadata } = useRemotePeer<PeerMetadata>({ peerId });
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  useEffect(() => {
    if (audioRef.current && audioStream) {
      audioRef.current.srcObject = audioStream;
    }
  }, [audioStream]);

  return (
    <div className="bg-gray-800 rounded-lg flex flex-col items-center justify-center">
      {videoStream ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          className="h-full w-full object-cover rounded-lg"
        />
      ) : (
        <>
          <div className="flex text-3xl font-semibold items-center justify-center w-24 h-24 bg-gray-700 text-gray-200 rounded-full">
            {metadata?.displayName?.[0].toUpperCase()}
          </div>
          <p className="text-gray-200 text-xl mt-2">{metadata?.displayName}</p>
        </>
      )}
      {audioStream && <audio ref={audioRef} autoPlay className="hidden" />}
    </div>
  );
};

export default RemotePeer;
