"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRoom } from "@huddle01/react/hooks";
import { useState } from "react";

const Lobby = () => {
  const [name, setName] = useState("");

  return (
    <div className="w-full min-h-screen p-8 flex flex-col items-center justify-center text-gray-200">
      <div className="flex justify-center items-center w-full max-w-3xl p-4 rounded-lg shadow">
        <div className="flex flex-col gap-4">
          <Card className="p-4">
            <video className="w-full h-full object-contain aspect-video" />
          </Card>
          <span className="font-extrabold text-2xl">
            Let's check your cam and mic
          </span>
          <Input
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800"
            placeholder="Enter you name"
          />
          <Button className="bg-gray-200">Join Studio</Button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
