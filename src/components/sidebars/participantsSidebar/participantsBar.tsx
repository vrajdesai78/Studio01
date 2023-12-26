import { usePeerIds } from "@huddle01/react/hooks";
import PeerData from "./peerData";
import RequestedPeers from "./requestedPeers";
import { useStudioState } from "@/store/studioState";
import clsx from "clsx";

const ParticipantsBar = () => {
  const { peerIds } = usePeerIds();
  const { requestedPeers } = useStudioState();

  return (
    <aside className="w-80 bg-gray-900 p-4 mr-4 rounded-lg transition-all duration-300 ease-in-out">
      <div className="mb-6">
        {requestedPeers.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-center text-gray-200">
              Requests for Mainstage
            </span>
            <div className="p-2 rounded-lg bg-gray-800">
              {requestedPeers.map((peerId) => (
                <RequestedPeers peerId={peerId} key={peerId} />
              ))}
            </div>
          </div>
        )}
        <h2
          className={clsx(
            "text-white font-semibold text-center",
            requestedPeers.length > 0 ? "my-3" : "mb-3"
          )}
        >
          Manage Participants
        </h2>
        <div className="flex flex-col gap-2 mt-2">
          {peerIds.map((peerId) => (
            <PeerData peerId={peerId} key={peerId} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ParticipantsBar;
