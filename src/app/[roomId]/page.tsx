"use client";

import RemotePeer from "@/components/remotePeer";
import { useStudioState } from "@/store/studioState";
import { BasicIcons } from "@/utils/BasicIcons";
import {
  useDataMessage,
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BottomBar from "@/components/bottomBar";
import { Button } from "@/components/ui/button";
import { PeerMetadata } from "@/utils/types";
import ChatBar from "@/components/sidebars/chatbar";
import MediaBar from "@/components/sidebars/mediaBar";
import ParticipantsBar from "@/components/sidebars/participantsSidebar/participantsBar";
import SettingsDialog from "@/components/settingsDialog";
import Video from "@/components/Media/Video";
import { Role } from "@huddle01/server-sdk/auth";
import AcceptRequest from "@/components/RequestModal";

export default function Component({ params }: { params: { roomId: string } }) {
  const { stream } = useLocalVideo();
  const {
    name,
    isChatOpen,
    isMediaOpen,
    isParticipantsOpen,
    setShowAcceptRequest,
    showAcceptRequest,
    addRequestedPeers,
    removeRequestedPeers,
  } = useStudioState();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { peerIds } = usePeerIds({
    roles: [Role.HOST, Role.CO_HOST, Role.SPEAKER],
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [requestedPeerId, setRequestedPeerId] = useState("");
  const router = useRouter();
  const { peerId } = useLocalPeer();
  const { metadata, role } = useLocalPeer<PeerMetadata>();
  const { state } = useRoom({
    onLeave: () => {
      router.push(`/${params.roomId}/lobby`);
    },
  });

  const { sendData } = useDataMessage({
    onMessage(payload, from, label) {
      if (label === "playMusic" && from !== peerId) {
        const audio = new Audio(payload);
        audio.play();
      }
      if (label === "requestForMainStage" && from !== peerId) {
        setShowAcceptRequest(true);
        addRequestedPeers(from);
        setRequestedPeerId(from);
        setTimeout(() => {
          setShowAcceptRequest(false);
        }, 5000);
      }
    },
  });

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (state === "idle") {
      router.push(`${params.roomId}/lobby`);
    }
  }, [state]);

  return (
    <div className="flex flex-col h-screen bg-black">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-white text-xl font-semibold">Studio01</h1>
        <div className="flex space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex gap-2 bg-gray-600/50 text-gray-200">
                {BasicIcons.invite}
                Invite
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="flex space-x-2">
                <span className="p-2 bg-gray-700/50 rounded-lg">
                  http://localhost:3000/{params.roomId}
                </span>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `http://localhost:3000/${params.roomId}`
                    );
                    setIsCopied(true);
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 3000);
                  }}
                >
                  {isCopied ? "Copied" : "Copy"}
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <SettingsDialog />
        </div>
      </header>
      <main className="transition-all ease-in-out flex flex-1 duration-300">
        <section className="flex-1 grid grid-cols-2 gap-4 px-4">
          {role !== Role.LISTENER ? (
            <div className="bg-gray-800 relative rounded-lg flex flex-col items-center justify-center">
              {stream ? (
                <Video stream={stream} />
              ) : (
                <div className="flex text-3xl font-semibold items-center justify-center w-24 h-24 bg-gray-700 text-gray-200 rounded-full">
                  {name[0]?.toUpperCase()}
                </div>
              )}
              <span className="absolute bottom-4 left-4 text-gray-200 font-medium">
                {`${metadata?.displayName} (You)`}
              </span>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg flex flex-col items-center justify-center gap-2">
              <span className="text-xl font-bold">
                Send Request For Main Stage
              </span>
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
                {isRequestSent ? "Request Sent" : "Send Request"}
              </Button>
            </div>
          )}
          {peerIds.length === 0 && (
            <div className="bg-gray-800 rounded-lg flex flex-col items-center justify-center">
              <span className="text-xl font-bold">Invite People</span>
              <span className="text-gray-400">
                Share the link to invite people to this studio
              </span>
              <div className="flex space-x-2 mt-2">
                <span className="p-2 bg-gray-700/50 rounded-lg">
                  http://localhost:3000/{params.roomId}
                </span>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `http://localhost:3000/${params.roomId}`
                    );
                    setIsCopied(true);
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 3000);
                  }}
                >
                  {isCopied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          )}
          {peerIds.map((peerId) => (
            <RemotePeer key={peerId} peerId={peerId} />
          ))}
        </section>
        {isChatOpen && <ChatBar />}
        {isMediaOpen && <MediaBar />}
        {isParticipantsOpen && <ParticipantsBar />}
      </main>
      <BottomBar />
      <div className="absolute bottom-6 right-6">
        {showAcceptRequest && <AcceptRequest peerId={requestedPeerId} />}
      </div>
    </div>
  );
}
