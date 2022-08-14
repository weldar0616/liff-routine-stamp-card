// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Liff } from "@line/liff";

type Data = {
  userName: string;
};

const fetchProfile = async (liff: Liff, liffId: string) => {
  await liff.init({ liffId }).catch((error) => {
    // alert(`[liff#init error] ${error}`);
  });

  const profile = await liff.getProfile().catch((error) => {
    // alert(`[liff#getProfile error] ${error}: LIFF ID = ${liffId}`);
  });
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
      const profile = await fetchProfile(liff, liffId);
      if (!profile) {
        res.status(400); // TODO: body
        return;
      }
      userName = profile.displayName;
    } else {
      res.status(400); // TODO: body
      return;
    }
  }

  res.status(200).json({ userName });
}
