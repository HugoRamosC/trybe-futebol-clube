import ICountGames from './ICountGames';
import ICountGoals from './ICountGoals';
import IRateTeam from './IRateTeam';

export interface ITeamStatics
  extends ICountGames, ICountGoals, IRateTeam {
  name: string,
}

export interface ITeamStaticsWithoutRate
  extends ICountGames {
  name: string,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance?: number,
  efficiency?: number,
}
