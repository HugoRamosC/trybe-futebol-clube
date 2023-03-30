import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusError = 500;
  if (error.message === 'All fields must be filled') statusError = 400;
  if (error.message === 'Unauthorized') statusError = 401;

  console.log(error);
  return res.status(statusError).json({ message: error.message });
};

export default errorMiddleware;
