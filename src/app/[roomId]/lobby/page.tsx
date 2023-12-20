"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStudioState } from "@/store/studioState";
import { BasicIcons } from "@/utils/BasicIcons";
import { PeerMetadata } from "@/utils/types";
import { useLocalPeer, useRoom } from "@huddle01/react/hooks";
import { useLocalAudio, useLocalVideo } from "@huddle01/react/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Lobby = ({ params }: { params: { roomId: string } }) => {
  const { isAudioOn, enableAudio, disableAudio } = useLocalAudio();
  const { stream, isVideoOn, enableVideo, disableVideo } = useLocalVideo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { name, setName } = useStudioState();
  const router = useRouter();
  const { updateMetadata } = useLocalPeer<PeerMetadata>();
  const { joinRoom } = useRoom({
    onJoin: () => {
      updateMetadata({ displayName: name });
      router.push(`/${params.roomId}`);
    },
  });

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-full min-h-screen p-8 flex flex-col items-center justify-center text-gray-200">
      <div className="flex justify-center items-center w-full max-w-md p-4 rounded-lg shadow">
        <div className="flex flex-col gap-4">
          <span className="font-extrabold text-2xl">
            Let's check your cam and mic
          </span>
          <Card className="relative p-4 w-full h-full">
            <div className="w-full h-full">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="aspect-video object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-6 right-0 left-0 justify-center flex gap-2 w-full">
              <button
                onClick={() => {
                  if (isVideoOn) {
                    disableVideo();
                  } else {
                    enableVideo();
                  }
                }}
                className="bg-gray-800/50 rounded-md"
              >
                {isVideoOn ? BasicIcons.on.cam : BasicIcons.off.cam}
              </button>
              <button
                onClick={() => {
                  if (isAudioOn) {
                    disableAudio();
                  } else {
                    enableAudio();
                  }
                }}
                className="bg-gray-800/50 rounded-md"
              >
                {isAudioOn ? BasicIcons.on.mic : BasicIcons.off.mic}
              </button>
            </div>
          </Card>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800"
            placeholder="Enter you name"
          />
          <Button
            className="bg-gray-200"
            onClick={async () => {
              const response = await fetch(`/token?roomId=${params.roomId}`);
              const token = await response.text();
              await joinRoom({
                roomId: params.roomId,
                token,
              });
            }}
          >
            Enter Studio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
