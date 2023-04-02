import { ModelStatic } from 'sequelize';
import MatchesModel from '../../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';
import TeamsService from './TeamsService';

export default class MatchesService {
  private _model: ModelStatic<MatchesModel> = MatchesModel;
  private _teamService: TeamsService = new TeamsService();

  async getAll(): Promise<IMatches[]> {
    const response = await this._model.findAll();
    const matches = Promise.all(response.map(async (match) => ({
      ...match.dataValues,
      homeTeam: { teamName: (await this._teamService.getById(match.homeTeamId))?.teamName },
      awayTeam: { teamName: (await this._teamService.getById(match.awayTeamId))?.teamName },
    })));
    return matches;
  }
}
