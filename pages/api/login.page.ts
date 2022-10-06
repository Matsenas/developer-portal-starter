import NodeForm from "form-data";
import { LoginRes } from "types/LoginResponse";
import { UserToken } from "types/UserToken";
import type { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const requestBody = JSON.parse(req.body);
    const { email, password } = requestBody;

    const body = new NodeForm();
    body.append("username", email);
    body.append("password", password);

    const response = await fetch("https://api.nftport.xyz/dashboard/login", {
      method: "POST",
      body: body as any,
    });

    if (!response.ok) return res.status(response.status).send(response.body);

    const token = (await response.json()) as LoginRes;

    const userToken: UserToken = {
      accessToken: token.access_token,
    };

    nookies.set({ res }, "userToken", JSON.stringify(userToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, /// 7 days
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
