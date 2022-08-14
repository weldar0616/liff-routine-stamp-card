// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { today } from "../../../lib/date";
import prisma from "../../../lib/prisma";

// TODO: 型定義
type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userName } = JSON.parse(req.body);

  try {
    // FIXME: DBに登録される日付がずれている...
    // postgresqlのTimeZoneはAsiaにした
    const result = await prisma.reports.create({
      data: {
        date: today,
        user_name: userName,
        kind: 1,
      },
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(400);
    res.statusMessage = "[Error] prisma reports create";
    return;
  }
}
