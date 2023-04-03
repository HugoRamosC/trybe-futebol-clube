import { Router } from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import verifyToken from '../middlewares/verifyTokenMiddleware';

const matchesRouter = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/matches', matchesController.getAll.bind(matchesController));
matchesRouter.patch(
  '/matches/:id/finish',
  verifyToken(),
  matchesController.finishMatch.bind(matchesController),
);
matchesRouter.patch(
  '/matches/:id',
  verifyToken(),
  matchesController.updateInProgressMatch.bind(matchesController),
);

export default matchesRouter;
