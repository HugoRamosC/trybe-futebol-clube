import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _matchesService: MatchesService;
  constructor(service: MatchesService) {
    this._matchesService = service;
  }

  async getAll(req: Request, res: Response) {
    if (req.query.inProgress) {
      const filtredResponse = await this._matchesService
        .getInProgressOrFineshed(String(req.query.inProgress));
      return res.status(200).json(filtredResponse);
    }
    const response = await this._matchesService.getAll();
    return res.status(200).json(response);
  }

  async finishMatch(req: Request, res: Response) {
    const response = await this._matchesService.finishMatch(+req.params.id);
    return res.status(200).json(response);
  }

  // async getInProgressOrFinished(req: Request, res: Response) {
  //   console.log('constroller>>>>>>>>', req.query);
  //   const response = await this._matchesService.getInProgressOrFineshed(req.query);
  //   res.status(200).json(response);
  // }
}
