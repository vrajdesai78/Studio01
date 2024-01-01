import { useStudioState } from "@/store/studioState";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { roomDB } from "@/utils/redis";

interface VideoRecorderProps {
  stream: MediaStream | null;
  name: string;
}

const VideoRecorder = ({ stream, name }: VideoRecorderProps) => {
  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const { isRecording } = useStudioState();

  const startRecording = () => {
    if (stream === null) {
      toast.error("No stream to record");
      return;
    }
    const media = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localVideoChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (e) => {
      if (typeof e.data === "undefined") return;
      if (e.data.size === 0) return;
      localVideoChunks.push(e.data);
    };
    setVideoChunks(localVideoChunks);
  };

  const stopRecording = () => {
    if (mediaRecorder.current === null) {
      return;
    }
    mediaRecorder.current?.stop();
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(videoChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("file", blob);
      fetch(`/upload?fileName=${name}.webm`, {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        console.log(await res.text());
      });
    };
  };

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  return <></>;
};

export default VideoRecorder;
