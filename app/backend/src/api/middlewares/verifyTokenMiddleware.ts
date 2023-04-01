import { NextFunction, Request, Response } from 'express';
import AuthenticatorJWT from '../../utils/auth';
import TokenErrors from '../Errors/tokenErrors';

const verifyToken = () =>
  (req: Request, res: Response, _next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) throw new TokenErrors('Token not found');
    const { role } = new AuthenticatorJWT().validateToken(token);

    return res.status(200).json({ role });
  };

export default verifyToken;
