import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  private _teamsService: TeamsService;
  constructor(service: TeamsService) {
    this._teamsService = service;
  }

  async getAll(_req: Request, res: Response) {
    const response = await this._teamsService.getAll();
    res.status(200).json(response);
  }
}
