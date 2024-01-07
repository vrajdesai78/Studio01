import React, { useEffect, useRef } from "react";
import VideoRecorder from "../Recorder/VideoRecorder";
import { useStudioState } from "@/store/studioState";

interface VideoProps {
  stream: MediaStream;
  name: string;
}

const Video = ({ stream, name }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isRecordVideo } = useStudioState();

  useEffect(() => {
    const videoObj = videoRef.current;

    if (videoObj && stream) {
      videoObj.srcObject = stream;
      videoObj.onloadedmetadata = async () => {
        try {
          videoObj.muted = true;
          await videoObj.play();
        } catch (error) {
          console.error(error);
        }
      };
    }
  }, [stream]);

  return (
    <>
      <video
        className="h-full w-full rounded-lg object-cover -scaleY-100"
        ref={videoRef}
        autoPlay
        muted
      />
      {isRecordVideo && <VideoRecorder stream={stream} name={name} />}
    </>
  );
};

export default Video;
