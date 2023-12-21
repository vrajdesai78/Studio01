import { usePeerIds } from "@huddle01/react/hooks";
import PeerData from "./peerData";

const ParticipantsBar = () => {
  const { peerIds } = usePeerIds();

  return (
    <aside className="w-64 bg-gray-900 p-4 mr-4 rounded-lg transition-all duration-300 ease-in-out">
      <div className="mb-6">
        <h2 className="text-white font-semibold mb-3">Manage Participants</h2>
        <div className="flex flex-col gap-2">
          {peerIds.map((peerId) => (
            <PeerData peerId={peerId} key={peerId} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ParticipantsBar;
