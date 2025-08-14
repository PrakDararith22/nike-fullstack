import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redis = createClient({
  socket: {
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
  },
});

redis.on("error", err => console.error("Redis Client Error", err));

await redis.connect();

export default redis;
