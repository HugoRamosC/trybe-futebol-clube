import { Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/matches', matchesController.getAll.bind(matchesController));

export default matchesRouter;
