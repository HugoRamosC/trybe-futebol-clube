import { ModelStatic } from 'sequelize';
import IServiceTeams from '../interfaces/IServiceTeams';
import TeamsModel from '../database/models/TeamsModel';
import ITeams from '../interfaces/ITeams';

export default class TeamsService implements IServiceTeams {
  private _model: ModelStatic<TeamsModel> = TeamsModel;

  async getAll(): Promise<ITeams[]> {
    const teams = await this._model.findAll();
    return teams;
  }

  async getById(id: number): Promise<ITeams | null> {
    const team = await this._model.findByPk(id);
    return team;
  }
}
