import PlayMusic from "../playMusic";
import { Button } from "../ui/button";

const MediaBar = () => {
  return (
    <aside className="w-80 bg-gray-900 p-4 mr-4 rounded-lg transition-all duration-300 ease-in-out">
      <div className="mb-6">
        <h2 className="text-white font-semibold mb-3">Play Music</h2>
        <div className="flex flex-col gap-2">
          <PlayMusic fileName="clapping.mp3" name="Clapping" />
          <PlayMusic fileName="drum.mp3" name="Drum Joke" />
        </div>
      </div>
    </aside>
  );
};

export default MediaBar;
