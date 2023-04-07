import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';
// import verifyToken from '../middlewares/verifyTokenMiddleware';

const leaderboardRouter = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get(
  '/leaderboard/home',
  // verifyToken(),
  leaderboardController.getHomeMatchesStatics.bind(leaderboardController),
);
leaderboardRouter.get(
  '/leaderboard/away',
  // verifyToken(),
  leaderboardController.getHomeMatchesStatics.bind(leaderboardController),
);

export default leaderboardRouter;
