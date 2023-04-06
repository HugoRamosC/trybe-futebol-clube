import { ModelStatic } from 'sequelize';
import TeamsModel from '../../database/models/TeamsModel';
import MatchesModel from '../../database/models/MatchesModel';
import ICountGames from '../interfaces/ICountGames';
import ICountGoals from '../interfaces/ICountGoals';
import IRateTeam from '../interfaces/IRateTeam';
import { ITeamStatics, ITeamStaticsWithoutRate } from '../interfaces/ITeamStatics';

export default class LeaderboardService {
  private _teamModel: ModelStatic<TeamsModel> = TeamsModel;
  private _matchesModel: ModelStatic<MatchesModel> = MatchesModel;

  async getName(id: number): Promise<string> {
    const { teamName } = await this._teamModel.findByPk(id) as TeamsModel;
    return teamName;
  }

  async getHomeGames(teamId: number, arrMatches: MatchesModel[]) {
    this.getHomeGames = this.getHomeGames.bind(this);
    const homeGames = arrMatches.filter((match) => match.homeTeamId === teamId);
    // .findAll({ where: { homeTeamId: teamId } }) as unknown as IMatches[];
    return homeGames;
  }

  async getAwayGames(teamId: number, arrMatches: MatchesModel[]) {
    this.getAwayGames = this.getAwayGames.bind(this);
    const awayGames = arrMatches.filter((match) => match.awayTeamId === teamId);
    // .findAll({ where: { awayTeamId: teamId } }) as unknown as IMatches[];
    return awayGames;
  }

  async countGames(teamId: number, arrMatches: MatchesModel[]): Promise<ICountGames> {
    const homeGames = await this.getHomeGames(teamId, arrMatches);
    const awayGames = await this.getAwayGames(teamId, arrMatches);
    const homeVictories = homeGames.filter((game) => game.homeTeamGoals > game.awayTeamGoals);
    const awayVictories = awayGames.filter((game) => game.awayTeamGoals > game.homeTeamGoals);
    const homeDraws = homeGames.filter((game) => game.homeTeamGoals === game.awayTeamGoals);
    const awayDraws = awayGames.filter((game) => game.awayTeamGoals === game.homeTeamGoals);

    const totalGames = homeGames.length + awayGames.length;
    const totalVictories = homeVictories.length + awayVictories.length;
    const totalDraws = homeDraws.length + awayDraws.length;

    return {
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: totalGames - totalVictories - totalDraws,
    };
  }

  async countGoals(teamId: number, arrMatches: MatchesModel[]): Promise<ICountGoals> {
    const homeGames = await this.getHomeGames(teamId, arrMatches);
    const awayGames = await this.getAwayGames(teamId, arrMatches);
    const homeGoalsFavor = homeGames.reduce((total, game) => total + game.homeTeamGoals, 0);
    const awayGoalsFavor = awayGames.reduce((total, game) => total + game.awayTeamGoals, 0);
    const homeGoalsOwn = homeGames.reduce((total, game) => total + game.awayTeamGoals, 0);
    const awayGoalsOwn = awayGames.reduce((total, game) => total + game.homeTeamGoals, 0);

    const goalsFavor = homeGoalsFavor + awayGoalsFavor;
    const goalsOwn = homeGoalsOwn + awayGoalsOwn;

    return {
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
    };
  }

  async rateTeam(teamId: number, arrMatches: MatchesModel[]): Promise<IRateTeam> {
    const games = await this.countGames(teamId, arrMatches);

    const victoriesPoints = games.totalVictories * 3;
    const totalPoints = victoriesPoints + games.totalDraws;
    const efficiency = (totalPoints / (games.totalGames * 3)) * 100;

    return {
      totalPoints,
      efficiency,
    };
  }

  async teamStatics(teamId: number, arrMatches: MatchesModel[]): Promise<ITeamStatics> {
    const name = await this.getName(teamId);
    const games = await this.countGames(teamId, arrMatches);
    const goals = await this.countGoals(teamId, arrMatches);
    const rate = await this.rateTeam(teamId, arrMatches);

    return {
      name,
      totalPoints: rate.totalPoints,
      totalGames: games.totalGames,
      totalVictories: games.totalVictories,
      totalDraws: games.totalDraws,
      totalLosses: games.totalLosses,
      goalsFavor: goals.goalsFavor,
      goalsOwn: goals.goalsOwn,
      goalsBalance: goals.goalsBalance,
      efficiency: +rate.efficiency.toFixed(2) as number,
    };
  }

  async getHomeMatchesStatics() {
    const allMatches = await this._matchesModel.findAll();
    const allTeams = await this._teamModel.findAll();
    const matchesStatics = await Promise.all(allTeams.map(async (team) => {
      const homeMatchesFinished: MatchesModel[] = allMatches
        .filter((match) => match.homeTeamId === team.id && match.inProgress === false);
      const obj: ITeamStaticsWithoutRate = await this
        .teamStatics(team.id, homeMatchesFinished);
      delete obj.goalsBalance;
      delete obj.efficiency;
      return obj;
    }));
    return matchesStatics;
  }
}
