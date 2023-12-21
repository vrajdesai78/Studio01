import React, { useEffect, useRef } from "react";

const Video = ({ stream }: { stream: MediaStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoObj = videoRef.current;

    if (videoObj && stream) {
      videoObj.srcObject = stream;
      videoObj.onloadedmetadata = async () => {
        console.warn("videoCard() | Metadata loaded...");
        try {
          videoObj.muted = true;
          await videoObj.play();
        } catch (error) {
          console.error(error);
        }
      };
      videoObj.onerror = () => {
        console.error("videoCard() | Error is hapenning...");
      };
    }
  }, [stream]);

  return (
    <video
      className="h-full w-full rounded-lg object-cover -scaleY-100"
      ref={videoRef}
      autoPlay
      muted
    />
  );
};

export default Video;
