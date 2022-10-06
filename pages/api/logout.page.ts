import type { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    nookies.destroy({ res }, "userToken", { path: "/" });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
