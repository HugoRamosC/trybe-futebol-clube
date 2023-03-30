import { Router } from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/LoginController';

const loginRouters = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRouters.post('/login', (req, res, next) => loginController.login(req, res, next));

export default loginRouters;
