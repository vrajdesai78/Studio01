"use client";

import RemotePeer from "@/components/remotePeer";
import { useStudioState } from "@/store/studioState";
import { BasicIcons } from "@/utils/BasicIcons";
import {
  useDataMessage,
  useDevices,
  useLocalAudio,
  useLocalMedia,
  useLocalPeer,
  useLocalVideo,
  usePeerIds,
  useRoom,
} from "@huddle01/react/hooks";
import { useEffect } from "react";
import { PeerMetadata } from "@/utils/types";
import { Role } from "@huddle01/server-sdk/auth";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

export default function Component({ params }: { params: { roomId: string } }) {
  const { activeBg, setActiveBg } = useStudioState();
  const { peerIds } = usePeerIds({
    roles: [Role.HOST, Role.CO_HOST, Role.SPEAKER],
  });
  const { metadata, peerId } = useLocalPeer<PeerMetadata>();
  const searchParams = useSearchParams();
  const { joinRoom } = useRoom();

  useDataMessage({
    onMessage(payload, from, label) {
      if (label === "bgChange" && from !== peerId) {
        setActiveBg(payload);
      }
    },
  });

  useEffect(() => {
    if (params.roomId && searchParams.get("token")) {
      joinRoom({
        roomId: params.roomId,
        token: searchParams.get("token") as string,
      });
    } else {
      console.log("no token");
    }
  }, []);

  useEffect(() => {
    console.log("token", searchParams.get("token"));
  }, [searchParams]);

  return (
    <div className={clsx("flex flex-col h-screen bg-black")}>
      <main
        className={`transition-all ease-in-out flex flex-1 duration-300 py-4 w-full h-full`}
        style={{
          backgroundColor: activeBg === "bg-black" ? "black" : undefined,
          backgroundImage:
            activeBg === "bg-black" ? undefined : `url(${activeBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <section className="flex-1 grid grid-cols-2 gap-4 px-4">
          {peerIds.map((peerId) => (
            <RemotePeer key={peerId} peerId={peerId} />
          ))}
        </section>
      </main>
    </div>
  );
}
