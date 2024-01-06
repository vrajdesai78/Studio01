"use client";

import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { TabsTrigger, TabsList, Tabs, TabsContent } from "@/components/ui/tabs";
import { createRoom } from "@/utils/createRoom";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex justify-end items-center p-4">
        <w3m-button />
      </nav>
      <div className="flex flex-col items-center justify-center h-full">
        <Button
          onClick={async () => {
            const roomId = await createRoom();
            router.push(`/${roomId}/lobby`);
          }}
        >
          Create Studio
        </Button>
      </div>
    </div>
  );
}
