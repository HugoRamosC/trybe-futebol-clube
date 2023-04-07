import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import { finishedMatchesMock, inProgressMatchesMock, matchesMock } from './expected_results/matches';

import verifyToken from '../api/middlewares/verifyTokenMiddleware';
import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/UsersModel';
import verifyRequeridFields from '../api/middlewares/verifyRequiredFieldsMiddleware';
import * as jwt from 'jsonwebtoken';


chai.use(chaiHttp);

const { expect } = chai;

describe('Matches tests', function () {
  afterEach(() => sinon.restore());

  describe('List matches', function () {
    it('Should return all matches', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as unknown as MatchesModel[]);

      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(matchesMock);
    });

    it('Should return in progress matches', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(
        inProgressMatchesMock as unknown as MatchesModel[]);

      const response = await chai
        .request(app)
        .get('/matches')
        .set('inProgress', 'true');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(inProgressMatchesMock);
    });

    it('Should return finished matches', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(
        finishedMatchesMock as unknown as MatchesModel[]);

      const response = await chai
        .request(app)
        .get('/matches')
        .set('inProgress', 'false');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(finishedMatchesMock);
    });
  });

  describe('Update matches', function () {
    it('Should return match updated to finish', async () => {
      const response = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      const httpResponse = await chai
        .request(app)
        .patch('/matches/41/finish')
      .set('Authorization', response.body.token);

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal({ message: 'Finished' });
    });
  });

  describe('Create new matche', function () {
    it('Should return status 422 if try create new match with same team', async () => {
      // sinon.stub(jwt, 'sign').resolves('tokenMock')

      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });

      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeamId: 1,
          awayTeamId: 1,
        })
        .set('Authorization', response.body.token);

      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  });
});

