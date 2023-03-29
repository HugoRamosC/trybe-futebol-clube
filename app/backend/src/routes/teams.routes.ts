import { Router } from 'express';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const routers = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

routers.get('/teams', teamsController.getAll);

export default routers;
