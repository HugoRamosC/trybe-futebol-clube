export default class RequiredFieldsError extends Error {
  public statusCode: number;
  constructor(message = 'All fields must be filled') {
    super(message);
    this.statusCode = 400;
  }
}
