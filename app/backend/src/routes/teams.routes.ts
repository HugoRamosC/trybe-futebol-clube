import { Router } from 'express';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const teamsRouters = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouters.get('/teams', teamsController.getAll.bind(teamsController));
teamsRouters.get('/teams/:id', teamsController.getById.bind(teamsController));

export default teamsRouters;
