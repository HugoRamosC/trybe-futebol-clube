import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;
  constructor(service: LeaderboardService) {
    this._leaderboardService = service;
  }

  async getHomeMatchesStatics(req: Request, res: Response) {
    const response = await this._leaderboardService
      .getHomeMatchesStatics(req);
    return res.status(200).json(response);
  }

  async getLeaderboard(req: Request, res: Response) {
    const response = await this._leaderboardService.getLeaderboard();
    return res.status(200).json(response);
  }
}
