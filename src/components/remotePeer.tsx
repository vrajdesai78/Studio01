import { PeerMetadata } from "@/utils/types";
import {
  useRemoteAudio,
  useRemotePeer,
  useRemoteVideo,
} from "@huddle01/react/hooks";
import { Avatar } from "./ui/avatar";
import { useEffect, useRef } from "react";
import Video from "./Media/Video";
import Audio from "./Media/Audio";

interface RemotePeerProps {
  peerId: string;
}

const RemotePeer = ({ peerId }: RemotePeerProps) => {
  const { stream: videoStream } = useRemoteVideo({ peerId });
  const { stream: audioStream } = useRemoteAudio({ peerId });
  const { metadata } = useRemotePeer<PeerMetadata>({ peerId });

  return (
    <div className="bg-gray-800 relative rounded-lg flex flex-col items-center justify-center">
      {videoStream ? (
        <Video stream={videoStream} name={metadata?.displayName ?? "guest"} />
      ) : (
        <div className="flex text-3xl font-semibold items-center justify-center w-24 h-24 bg-gray-700 text-gray-200 rounded-full">
          {metadata?.displayName?.[0].toUpperCase()}
        </div>
      )}
      <span className="absolute bottom-4 left-4 text-gray-200 font-medium">
        {metadata?.displayName}
      </span>
      {audioStream && <Audio stream={audioStream} name={metadata?.displayName ?? "guest"}/>}
    </div>
  );
};

export default RemotePeer;
