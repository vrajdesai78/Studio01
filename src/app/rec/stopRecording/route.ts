import { Recorder } from "@huddle01/server-sdk/recorder";

interface Recordings {
  id: string;
  recordingUrl: string;
  recordingSize: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");
  if (!roomId) {
    return new Response("Missing roomId", { status: 400 });
  }

  const recorder = new Recorder(
    process.env.NEXT_PUBLIC_PROJECT_ID!,
    process.env.API_KEY!
  );

  const recording = await recorder.stop({
    roomId: roomId,
  });

  console.log("recording stopped", recording);

  const { msg } = recording;

  if (msg === "Stopped") {
    const response = await fetch(
      "https://api.huddle01.com/api/v1/get-recordings",
      {
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
      }
    );
    const data = await response.json();

    const { recordings } = data as { recordings: Recordings[] };

    console.log("recordings", recordings);

    return new Response(JSON.stringify(recordings[0]), {
      status: 200,
    });
  }

  return new Response(JSON.stringify(recording), {
    status: 200,
  });
}
