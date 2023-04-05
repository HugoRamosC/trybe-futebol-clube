import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import { finishedMatchesMock, inProgressMatchesMock, matchesMock } from './expected_results/matches';

import verifyToken from '../api/middlewares/verifyTokenMiddleware';
import { Request, Response, NextFunction } from 'express';


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
      // const filtredInProgressMock = matchesMock
      //   .filter((match) => match.inProgress === true)

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
      sinon.stub(MatchesModel, 'create').resolves({
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 5,
        "awayTeamId": 8,
        "awayTeamGoals": 6,
        "inProgress": true,
      } as any)
      //  returns(
      //   (_req: Request, _res: Response, next: NextFunction) => {
      //   next()
      // });
      // const middlewaresStub = {
      //   getUserAuthenticated: 
      //   sinon.stub().callsFake((var1, var2, var3) => {
      //     return async (req: Request, res: Response, next: NextFunction) => {
      //       next();
      //     };
      //   });
      // };

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjgwNTQxODY3LCJleHAiOjE2ODMxMzM4Njd9.9mxXH-G5R6PMJ6HIi48iNX-1ZFdO505r5OWvXpJUToU'
      // await chai
      //   .request(app)
      //   .post('/login')
      //   .send({
      //     "email": "admin@admin.com",
      //     "password": "secret_admin",
      //   })
      //   .set('Authorization', token);
      // expect(token).to.not.be.null;

      const response = await chai
        .request(app)
        .patch('/matches/41/finish')
        .set('Authorization', token);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ message: 'Finished' });
    });
  });

  describe('Create new matche', function () {
    it('Should return status 422 if try create new match with same team', async () => {
      const response = await chai
        .request(app)
        .post('/matches')
        .send({
          homeTeamId: 1,
          awayTeamId: 1,
        })

      expect(response.status).to.be.equal(422);
      expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  });
});

