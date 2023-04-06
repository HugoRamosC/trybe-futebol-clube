import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;
  constructor(service: LeaderboardService) {
    this._leaderboardService = service;
  }

  async getHomeMatchesStatics(_req: Request, res: Response) {
    console.log('controllerrrrr');
    const response = await this._leaderboardService.getHomeMatchesStatics();
    return res.status(200).json(response);
  }
}
