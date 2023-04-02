import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _matchesService: MatchesService;
  constructor(service: MatchesService) {
    this._matchesService = service;
  }

  async getAll(_req: Request, res: Response) {
    const response = await this._matchesService.getAll();
    // console.log('>>>>>', response);
    res.status(200).json(response);
  }
}
