// https://nextjs.org/learn/basics/api-routes/creating-api-routes
import { NextApiRequest, NextApiResponse } from "next";

// req = HTTP incoming message, res = HTTP server response
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ text: "Hello" });

  // const email = req.body.email;
  // Then save email to your database, etc...
}
