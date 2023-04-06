import ICountGames from './ICountGames';
import ICountGoals from './ICountGoals';
import IRateTeam from './IRateTeam';

export default interface ITeamStatics
  extends ICountGames, ICountGoals, IRateTeam {
  name: string,
}

export interface ITeamStaticsWithoutRate
  extends ICountGames {
  name: string,
  totalPoints: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance?: number,
  efficiency?: number,
}
