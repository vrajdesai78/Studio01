import { AccessToken, Role } from "@huddle01/server-sdk/auth";
import { Recorder } from "@huddle01/server-sdk/recorder";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");
  
  if (!roomId) {
    return new Response("Missing roomId", { status: 400 });
  }

  const accessToken = new AccessToken({
    apiKey: process.env.API_KEY!,
    roomId: roomId as string,
    role: Role.BOT,
    permissions: {
      admin: false,
      canConsume: true,
      canProduce: false,
      canProduceSources: {
        cam: false,
        mic: false,
        screen: false,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
  });

  const token = await accessToken.toJwt();

  const recorder = new Recorder(
    process.env.NEXT_PUBLIC_PROJECT_ID!,
    process.env.API_KEY!
  );

  const recording = await recorder.startRecording({
    roomId: roomId as string,
    token,
    customLayoutUrl: `https://0d4c-2409-40c1-5001-cd70-a8fb-80fb-3c73-1360.ngrok-free.app/rec/${roomId}?token=${token}`,
  });

  console.log("recording started", recording);

  return new Response(JSON.stringify(recording), {
    status: 200,
  });
}
