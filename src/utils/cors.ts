import { NextApiRequest, NextApiResponse } from "next";

const handleCors = (req: NextApiRequest, res: NextApiResponse) => {
  const origin = req.headers.origin;
  // const allowedDomainPattern =
  //   /^https:\/\/([a-z0-9-]+\.)?mano-cv\.lt$|^http:\/\/localhost(:\d+)?$/;
  console.log("handleCors", origin);

  // if (origin && allowedDomainPattern.test(origin)) {
  console.log("set cors res");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // }

  if (req.method === "OPTIONS") {
    res.status(200).end(); // End preflight request
    return true; // Indicate that the request has been handled
  }

  return false; // Request should continue to API logic
};

export { handleCors };
