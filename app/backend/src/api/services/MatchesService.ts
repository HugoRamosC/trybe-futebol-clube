import { ModelStatic } from 'sequelize';
// import { ParseOptions } from 'querystring';
import MatchesModel from '../../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';
import TeamsService from './TeamsService';
import Teams from '../../database/models/TeamsModel';

export default class MatchesService {
  private _model: ModelStatic<MatchesModel> = MatchesModel;
  private _teamService: TeamsService = new TeamsService();

  async getAll(): Promise<IMatches[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    // const matches = Promise.all(response.map(async (match) => ({
    //   ...match.dataValues,
    //   homeTeam: { teamName: (await this._teamService.getById(match.homeTeamId))?.teamName },
    //   awayTeam: { teamName: (await this._teamService.getById(match.awayTeamId))?.teamName },
    // })));
    return matches;
  }

  async getInProgressOrFineshed(inProgress: string): Promise<IMatches[]> {
    const response = (await this.getAll())
      .filter((match) => String(match.inProgress) === inProgress);
    return response;

    // if (inProgress === 'true') {
    //   const filtred = await this._model.findAll({ where: { inProgress: true } });
    //   return filtred;
    // }
    // const filtred = await this._model.findAll({ where: { inProgress: false } });
    // return filtred;
  }

  async finishMatch(id: number) {
    await this._model.update(
      { values: { inProgress: false } },
      { where: { id } },
    );
    return { message: 'Finished' };
  }
}
