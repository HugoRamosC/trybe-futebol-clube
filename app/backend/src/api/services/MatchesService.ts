import { ModelStatic } from 'sequelize';
import IMatchGoals from '../interfaces/IMatchGoals';
import INewMatch from '../interfaces/INewMatch';
import MatchesModel from '../../database/models/MatchesModel';
import TeamsService from './TeamsService';
import Teams from '../../database/models/TeamsModel';
import ConflictTeamsError from '../Errors/conflictTeamsError';
import NotFoundTeamError from '../Errors/notFoundTeamError';

export default class MatchesService {
  private _model: ModelStatic<MatchesModel> = MatchesModel;
  private _teamService: TeamsService = new TeamsService();

  async getAll(): Promise<MatchesModel[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async getInProgressOrFineshed(inProgress: string): Promise<MatchesModel[]> {
    const response = (await this.getAll())
      .filter((match) => String(match.inProgress) === inProgress);
    return response;
  }

  async finishMatch(id: number) {
    await this._model.update(
      { inProgress: false },
      { where: { id } },
    );
    return { message: 'Finished' };
  }

  async updateInProgressMatch({ id, homeTeamGoals, awayTeamGoals }: IMatchGoals) {
    await this._model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { message: 'GOOOOOOLLLL!!!!' };
  }

  async newMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: INewMatch) {
    if (homeTeamId === awayTeamId) throw new ConflictTeamsError();
    const isHomeTeam = await this._model.findByPk(homeTeamId);
    const isAwayTeam = await this._model.findByPk(awayTeamId);
    if (!isHomeTeam || !isAwayTeam) throw new NotFoundTeamError();
    const newMatch = await this._model.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    return newMatch;
  }
}
