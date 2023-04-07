import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get(
  '/leaderboard/home',
  leaderboardController
    .getHomeMatchesStatics.bind(leaderboardController),
);
leaderboardRouter.get(
  '/leaderboard/away',
  leaderboardController
    .getHomeMatchesStatics.bind(leaderboardController),
);
leaderboardRouter.get(
  '/leaderboard',
  leaderboardController
    .getLeaderboard.bind(leaderboardController),
);

export default leaderboardRouter;
