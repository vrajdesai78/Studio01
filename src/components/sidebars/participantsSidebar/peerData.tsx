import { Button } from "@/components/ui/button";
import {
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { BasicIcons } from "@/utils/BasicIcons";
import { PeerMetadata } from "@/utils/types";
import { useRemotePeer, useRoom } from "@huddle01/react/hooks";
import { Role } from "@huddle01/server-sdk/auth";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface PeerDataProps {
  peerId: string;
}

const PeerData = ({ peerId }: PeerDataProps) => {
  const { metadata, role, updateRole } = useRemotePeer<PeerMetadata>({
    peerId,
  });

  const { leaveRoom, kickPeer } = useRoom();
  return (
    <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
      <div className="flex text-sm font-semibold items-center justify-center min-w-6 min-h-6 bg-gray-700 text-gray-200 rounded-full">
        {metadata?.displayName?.[0].toUpperCase()}
      </div>
      <span className="text-ellipsis overflow-hidden min-w-20">
        {metadata?.displayName}
      </span>
      <div className="flex items-center justify-end w-full">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>{BasicIcons.more}</TooltipTrigger>
            <TooltipContent align="center" side="bottom">
              <div className="flex flex-col bg-gray-700 rounded-lg mr-2">
                <button className="flex gap-2 p-2 gray-700 w-full rounded-lg hover:bg-gray-600 text-sm">
                  {role && ["speaker", "coHost", "host"].includes(role) ? (
                    <button
                      className="flex items-center gap-2"
                      onClick={() => {
                        updateRole(Role.LISTENER);
                      }}
                    >
                      <span>{BasicIcons.out}</span>
                      <span>Move to Back Stage</span>
                    </button>
                  ) : (
                    <button
                      className="flex gap-2"
                      onClick={() => {
                        updateRole(Role.CO_HOST);
                      }}
                    >
                      <span>{BasicIcons.in}</span>
                      <span>Move to Main Stage</span>
                    </button>
                  )}
                </button>
                <button className="flex gap-2 text-semibold text-red-500 p-2 w-full rounded-lg hover:bg-gray-600 text-sm">
                  {role === Role.HOST ? (
                    <button
                      className="flex items-center gap-2"
                      onClick={leaveRoom}
                    >
                      <span>{BasicIcons.endCall}</span>
                      <span>Leave Studio</span>
                    </button>
                  ) : (
                    <button
                      className="flex items-center gap-2"
                      onClick={() => kickPeer(peerId)}
                    >
                      <span>{BasicIcons.close}</span>
                      <span>Kick Participant</span>
                    </button>
                  )}
                </button>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PeerData;
