export default class UnauthorizedError extends Error {
  public statusCode: number;
  constructor(message = 'Invalid email or password') {
    super(message);
    this.statusCode = 401;
  }
}
