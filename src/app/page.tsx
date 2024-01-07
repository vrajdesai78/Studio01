"use client";

import { Button } from "@/components/ui/button";
import { CardContent, Card, CardTitle, CardHeader } from "@/components/ui/card";
import { useAccount } from "wagmi";
import { createRoom } from "@/utils/createRoom";
import { studioDB } from "@/utils/redis";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";
import RecordingsModal from "@/components/RecordingsModal";

export default function Component() {
  const router = useRouter();
  const { address } = useAccount();
  const [rooms, setRooms] = useState<string[]>([]);

  useEffectOnce(() => {
    const getRooms = async () => {
      const rooms = (await studioDB.get(address as string)) as string[];
      if (rooms) {
        setRooms(rooms);
      }
    };
    getRooms();
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex justify-end items-center p-4">
        <w3m-button />
      </nav>
      <div className="flex flex-col items-center justify-center h-full">
        <Button
          onClick={async () => {
            const roomId = await createRoom();
            const rooms = (await studioDB.get(address as string)) as string[];
            if (rooms) {
              await studioDB.set(address as string, [...rooms, roomId]);
            } else {
              await studioDB.set(address as string, [roomId]);
            }
            router.push(`/${roomId}/lobby`);
          }}
        >
          Create New Studio
        </Button>
        <div className="grid grid-cols-4 gap-8 p-4 w-4/5 mt-4">
          {rooms.map((roomId) => {
            return (
              <Card key={roomId}>
                <CardHeader>
                  <CardTitle className="items-center"> {roomId} </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Button onClick={() => router.push(`/${roomId}/lobby`)}>
                      Join Studio
                    </Button>
                    <RecordingsModal key={roomId} roomId={roomId} type="full">
                      <Button>Full Recordings</Button>
                    </RecordingsModal>
                    <RecordingsModal key={roomId} roomId={roomId} type="audio">
                      <Button>Audio Recordings</Button>
                    </RecordingsModal>
                    <RecordingsModal key={roomId} roomId={roomId} type="video">
                      <Button>Video Recordings</Button>
                    </RecordingsModal>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
