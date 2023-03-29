import { Response } from 'express';

export default interface IControllerTeams {
  getAll(): Promise<Response>;
}
