import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { teamsMock } from './expected_results/teams';

import { Response } from 'superagent';
import ITeams from '../api/interfaces/ITeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login/Users tests', function () {
  afterEach(() => sinon.restore());

  describe('Required inputs not found', () => {
    it('Should return status 400 if the email is not informed', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'any_password'
        })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })

    it('Should return status 400 if the password is not informed', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'email@mail.com'
        })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
  })

  describe('Invalid inputs', () => {
    it('Should return status 401 if informed a invalid email', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'invalidEmail.com',
          password: '123456',
        })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    })

    it('Should return status 401 if informed a invalid password', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'invalid@Email.com',
          password: 'small'
        })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    })
  })

  describe('Invalid token', () => {
    it('Should return status 401 if token not found', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/role')
        .send({})
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Token not found' })
    })
    it('Should return status 401 if informed a invalid token', async () => {
      const token = await chai// response
        .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "secret_admin",
        })
      expect(token).to.not.be.null;
      
      const httpResponse = await chai
        .request(app)
        .get('/login/role')
        .set('Authorization', `${token}`);
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
    })
  })
});
