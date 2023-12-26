import { BasicIcons } from "@/utils/BasicIcons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ChatBar = () => {
  return (
    <div className="flex w-80 rounded-lg mr-4 flex-col h-full bg-gray-800 text-white">
      <div className="px-4 py-2 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Chat</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex items-end justify-start mb-4">
          <div className="max-w-xs rounded-lg bg-gray-700 px-4 py-2">
            Hello! How can I help you today?
          </div>
        </div>
        <div className="flex items-end justify-end mb-4">
          <div className="max-w-xs rounded-lg bg-blue-600 px-4 py-2">
            Hi! I'm looking for more information on your services.
          </div>
        </div>
        <div className="flex items-end justify-start">
          <div className="max-w-xs rounded-lg bg-gray-700 px-4 py-2">
            Sure! What would you like to know?
          </div>
        </div>
      </div>
      <div className="p-2 rounded-b-lg">
        <div className="flex gap-2">
          <Input
            className="flex-1 rounded-lg bg-gray-700 text-white placeholder-gray-400"
            placeholder="Type your message"
          />
          <Button className="bg-gray-700 hover:bg-gray-600 text-gray-200">
            {BasicIcons.send}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
