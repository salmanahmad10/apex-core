import { Request, Response, NextFunction } from 'express';

// Generic Error Handler Middleware
export const errorHandler = (
  err: { statusCode?: number; message?: string; stack?: string } | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = (err?.statusCode as number) || 500;
  const message = (err?.message as string) || 'Internal Server Error';

  res.status(status).json({
    status,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : (err?.stack ?? null)
  });
};
