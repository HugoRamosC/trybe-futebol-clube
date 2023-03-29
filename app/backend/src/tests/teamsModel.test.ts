import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import teamsMock from '../../../../__tests__/expected_results/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Model', function () {
  afterEach(() => sinon.restore());

  describe('List all teams', function () {
    it('Should return all teams', async () => {
      sinon.stub(TeamsModel, 'getAll').resolves(teamsMock);
      const response = await chai.request(app).get('/teams');

      expect(response.status).to.be.equal(200);
      expect(response.body.teams).to.be.equal(teamsMock);
    });
  });

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
