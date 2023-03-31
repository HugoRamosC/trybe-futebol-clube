import ITeams from './ITeams';

export default interface IServiceTeams {
  getAll(): Promise<ITeams[]>;
}
