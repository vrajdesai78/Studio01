"use client";
import { Button } from "@/components/ui/button";
import { createRoom } from "@/utils/createRoom";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Button
        onClick={async () => {
          const roomId = await createRoom();
          router.push(`${roomId}/lobby`);
        }}
      >
        Create Studio
      </Button>
    </div>
  );
}
