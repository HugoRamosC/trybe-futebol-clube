import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { teamsMock, leaderboardMock } from './expected_results/teams';

import { Response } from 'superagent';
import ITeams from '../api/interfaces/ITeams';
import ITeamStatics from '../api/interfaces/ITeamStatics';
import LeaderboardService from '../api/services/LeaderboardService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard tests', function () {
  afterEach(() => sinon.restore());

  describe('List all teams in leaderboard', function () {
    it('Should return all teams in leaderboard', async () => {
      // sinon.stub(LeaderboardService, 'getLeaderboard').resolves(leaderboardMock as unknown as ITeamStatics[]);

      const response = await chai.request(app).get('/leaderboard');

      expect(response.status).to.be.equal(200);
      // expect(response.body).to.deep.equal(leaderboardMock);
    });
    it('Should return home matches teams in leaderboard', async () => {
      // sinon.stub(LeaderboardService, 'getLeaderboard').resolves(leaderboardMock as unknown as ITeamStatics[]);

      const response = await chai.request(app).get('/leaderboard/home');

      expect(response.status).to.be.equal(200);
      // expect(response.body).to.deep.equal(leaderboardMock);
    });
    it('Should return away matches teams in leaderboard', async () => {
      // sinon.stub(LeaderboardService, 'getLeaderboard').resolves(leaderboardMock as unknown as ITeamStatics[]);

      const response = await chai.request(app).get('/leaderboard/away');

      expect(response.status).to.be.equal(200);
      // expect(response.body).to.deep.equal(leaderboardMock);
    });
  });
});
