import { Router } from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/LoginController';
import verifyRequeridFields from '../middlewares/verifyRequiredFields';

const loginRouters = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouters.post(
  '/login',
  verifyRequeridFields('login'),
  loginController.login.bind(loginController),
);

export default loginRouters;
