export default class ConflictTeamsError extends Error {
  public statusCode: number;
  constructor(message = 'It is not possible to create a match with two equal teams') {
    super(message);
    this.statusCode = 422;
  }
}
