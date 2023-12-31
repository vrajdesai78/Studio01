import { BasicIcons } from "@/utils/BasicIcons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import clsx from "clsx";
import { useStudioState } from "@/store/studioState";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useDataMessage, useLocalPeer } from "@huddle01/react/hooks";
import { PeerMetadata } from "@/utils/types";
import toast from "react-hot-toast";

const BackgroundChange = () => {
  const { activeBg, setActiveBg } = useStudioState();
  const { sendData } = useDataMessage();
  const { role } = useLocalPeer<PeerMetadata>();

  const handleBgChange = (bg: string) => {
    if (role === "host") {
      setActiveBg(bg);
      sendData({
        to: "*",
        payload: bg,
        label: "bgChange",
      });
    } else {
      toast.error("Only the host can change the background");
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Background</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-4">
          <button className="bg-gray-800 flex justify-center items-center text-gray-200 text-center rounded-lg hover:bg-gray-700 text-sm">
            {BasicIcons.image}
          </button>
          {[...Array(5)].map((_, i) => {
            return (
              <button
                key={i}
                className={clsx(
                  "bg-gray-800 text-gray-200 p-2 rounded-lg hover:bg-gray-700",
                  activeBg === `/bg/${i + 1}.jpeg` &&
                    "ring-2 ring-offset-2 ring-gray-400"
                )}
                onClick={() => handleBgChange(`/bg/${i + 1}.jpeg`)}
              >
                <Avatar>
                  <AvatarImage src={`/bg/${i + 1}.jpeg`} />
                </Avatar>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BackgroundChange;
