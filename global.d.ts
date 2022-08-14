import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly DATABASE_URL: string;
    readonly LIFF_ID_POST_APP: string;
    readonly MESSAGING_API_CHANNEL_ACCESS_TOKEN: string;
  }
}