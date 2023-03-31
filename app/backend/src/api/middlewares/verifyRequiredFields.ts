import { NextFunction, Request, Response } from 'express';
import RequiredFieldsError from '../Errors/requiredFieldsError';

const requestRequiredFields = {
  login: ['email', 'password'],
};

const verifyRequeridFields = (key: keyof typeof requestRequiredFields) =>
  (req: Request, res: Response, next: NextFunction) => {
    const requiredFields = requestRequiredFields[key];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) next(new RequiredFieldsError());
    }

    next();
  };

export default verifyRequeridFields;
