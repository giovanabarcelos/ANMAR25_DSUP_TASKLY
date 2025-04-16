import { Response } from "express"

export function errorHandler(
  err: unknown, 
  res: Response
): void {
  if (err instanceof Error) {
    if (err.message.includes('Invalid data')) {
      res.status(400).json({
        message: "Bad Request",
        error: err.message,
      })
    } else {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
        error: err.message,
      })
    }
  } else {
    res.status(500).json({
      message: "An unknown error occurred",
      error: "Unknown error",
    })
  }
}
