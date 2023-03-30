import { Router } from 'express';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const teamsRouters = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouters.get('/teams', (req, res) => teamsController.getAll(req, res));
teamsRouters.get('/teams/:id', (req, res) => teamsController.getById(req, res));

export default teamsRouters;
