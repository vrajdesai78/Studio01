"use client";

import { useDevices } from "@huddle01/react/hooks";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { BasicIcons } from "@/utils/BasicIcons";
import { Button } from "./ui/button";

interface ChangeDeviceProps {
  deviceType: "mic" | "cam" | "speaker";
  children: React.ReactNode;
}

const ChangeDevice: FC<ChangeDeviceProps> = ({ children, deviceType }) => {
  const { devices, setPreferredDevice, preferredDevice } = useDevices({
    type: deviceType,
  });

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            {devices.map((device) => (
              <button
                key={device.deviceId}
                onClick={() => {
                  setPreferredDevice(device.deviceId);
                }}
                className="flex gap-2 p-2 gray-800 w-full rounded-lg hover:bg-gray-700"
              >
                <span>
                  {preferredDevice?.deviceId === device.deviceId &&
                    BasicIcons.selected}
                </span>
                {device.label}
              </button>
            ))}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ChangeDevice;
