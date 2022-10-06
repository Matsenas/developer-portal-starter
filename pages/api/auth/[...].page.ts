import { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import nookies from "nookies";
import { UserToken } from "types/UserToken";

const API_URL = "https://api.nftport.xyz/dashboard"; // TODO environment

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function adapter(req: NextApiRequest, res: NextApiResponse) {
  return new Promise(() => {
    const reqCookies = nookies.get({ req });
    const tokenCookie = reqCookies["userToken"];
    const { accessToken } = JSON.parse(tokenCookie) as UserToken;

    if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
    if (!req.url)
      return res
        .status(400)
        .json({ message: "Something went wrong. Unable to read request url." });

    const strippedURL = req.url.replace("/api/auth", "");

    const reqURL = new URL(strippedURL, API_URL);

    req.url = reqURL.toString();

    req.headers.cookie = "";
    req.headers["authorization"] = `Bearer ${accessToken}`;

    return proxy.web(req, res, {
      target: API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
  });
}
