// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Liff } from "@line/liff";

type Data = {
  userName: string;
};

const fetchProfile = async (liff: Liff, liffId: string) => {
  await liff.init({ liffId });
  const profile = await liff.getProfile();
  return profile;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let userName = "dummy-user"; // TEST
  if (process.env.NODE_ENV === "production") {
    const liff = (await import("@line/liff")).default;
    const liffId = req.query.liffId;

    if (typeof liffId === "string") {
      try {
        // TEST
        userName = "tako";
        // const profile = await fetchProfile(liff, liffId);
        // if (!profile) {
        //   res.status(400);
        //   res.statusMessage = "[Error] fetch profile";
        //   return;
        // }
        // userName = profile.displayName;
      } catch (e) {
        res.status(500);
        res.statusMessage = "[Error] fetch profile exception";
        return;
      }
    } else {
      res.status(400);
      res.statusMessage = "[Error] liffid is not string";
      return;
    }
  }

  res.status(200).json({ userName });
}
