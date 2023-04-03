import { Router } from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/LoginController';
import InputsLoginValidations from '../../utils/userValidation';
import verifyRequeridFields from '../middlewares/verifyRequiredFieldsMiddleware';
import verifyToken from '../middlewares/verifyTokenMiddleware';

const loginRouters = Router();

const loginValidation = new InputsLoginValidations();
const loginService = new LoginService(loginValidation);
const loginController = new LoginController(loginService);

loginRouters.post(
  '/login',
  verifyRequeridFields('login'),
  loginController.login.bind(loginController),
);
loginRouters.get(
  '/login/role',
  verifyToken(),
  loginController.getRole.bind(loginController),
);

export default loginRouters;
