import PlayMusic from "../playMusic";
import { Button } from "../ui/button";

const MediaBar = () => {
  return (
    <aside className="w-80 bg-gray-800 h-full mr-4 rounded-lg transition-all duration-300 ease-in-out">
      <div className="mb-6">
        <div className="px-4 py-2 border-b border-gray-700">
          <h1 className="text-xl font-semibold">Music</h1>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <PlayMusic fileName="clapping.mp3" name="Clapping" />
          <PlayMusic fileName="drum.mp3" name="Drum Joke" />
        </div>
      </div>
    </aside>
  );
};

export default MediaBar;
