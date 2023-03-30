import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { teamsMock } from './expected_results/teams';

import { Response } from 'superagent';
import ITeams from '../interfaces/ITeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams tests', function () {
  afterEach(() => sinon.restore());

  describe('List all teams', function () {
    it('Should return all teams', async () => {
      sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as []);

      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(teamsMock);
    });
  });
});
