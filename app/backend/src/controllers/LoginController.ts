import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  private _loginService: LoginService;
  constructor(service: LoginService) {
    this._loginService = service;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this._loginService.login(req.body);
      res.status(200).json({ token: user?.password });
    } catch (error) {
      next(Error);
    }
  }
}
