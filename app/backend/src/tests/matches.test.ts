import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import { matchesMock } from './expected_results/matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches tests', function () {
  afterEach(() => sinon.restore());

  describe('List all matches', function () {
    it('Should return all matches', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as unknown as MatchesModel[]);

      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(matchesMock);
    });
  });

  // describe('List team by ID', function () {
  //   it('Should return a team', async () => {
  //     sinon.stub(TeamsModel, 'findByPk').resolves(teamsMock[0] as unknown as TeamsModel);

  //     const response = await chai.request(app).get('/teams/1');

  //     expect(response.status).to.be.equal(200);
  //     expect(response.body).to.deep.equal(teamsMock[0]);
  //   });
  // });
});
