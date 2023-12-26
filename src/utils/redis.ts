import { Redis } from "@upstash/redis";

if (!process.env.ROOM_DB_URL || !process.env.ROOM_DB_TOKEN) {
  throw new Error("REDIS_URL or REDIS_TOKEN is null for Room DB");
}

export const roomDB = new Redis({
  url: process.env.ROOM_DB_URL,
  token: process.env.ROOM_DB_TOKEN,
});
