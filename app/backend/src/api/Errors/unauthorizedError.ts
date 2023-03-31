export default class UnauthorizedError extends Error {
  public statusCode: number;
  constructor(message = 'Anauthorized access') {
    super(message);
    this.statusCode = 401;
  }
}
