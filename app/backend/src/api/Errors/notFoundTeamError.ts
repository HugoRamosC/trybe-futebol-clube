export default class NotFoundTeamError extends Error {
  public statusCode: number;
  constructor(message = 'There is no team with such id!') {
    super(message);
    this.statusCode = 404;
  }
}
