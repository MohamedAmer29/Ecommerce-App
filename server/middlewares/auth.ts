import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default async function authUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.headers;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Autherized login again",
    });
  }
  try {
    const secret = process.env.JWT_SECRET as string;
    const token_decode = jwt.verify(token as string, secret);

    if (!req.body) req.body = {};

    req.body.userId = (token_decode as JwtPayload).id;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}
