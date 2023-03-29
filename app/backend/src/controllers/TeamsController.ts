import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(private _teamsService: TeamsService) {}

  async getAll(_req: Request, res: Response) {
    const response = this._teamsService.getAll();
    res.status(200).json(response);
  }
}
