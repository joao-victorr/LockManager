import { AxiosError } from "axios";
import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "../helpers/apiErrors";


export const ErrorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error)
  if (error instanceof AxiosError) {
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : "Inexpected Server Error";
    return res.status(statusCode).json({error: message})
  }

  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Inexpected Server Error";
  return res.status(statusCode).json({error: message})
}