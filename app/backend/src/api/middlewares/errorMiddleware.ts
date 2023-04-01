import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error.statusCode) {
    // console.log(error);
    return res.status(error.statusCode).json({ message: error.message });
  }

  // console.log(error);
  return res.status(500).json({ message: error.message });
};

export default errorMiddleware;
