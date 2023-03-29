import IServiceTeams from '../interfaces/IServiceTeams';
import TeamsModel from '../database/models/TeamsModel';
import ITeams from '../interfaces/ITeams';

export default class TeamsService implements IServiceTeams {
  constructor(private _teamModel = TeamsModel) {}

  async getAll(): Promise<ITeams[]> {
    const teams = await this._teamModel.findAll();
    return teams;
  }
}
