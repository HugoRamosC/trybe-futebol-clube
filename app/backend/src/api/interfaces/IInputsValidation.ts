import IUserLogin from './IUserLogin';

export default interface IInputsValidations {
  validateUserEmail(email: string): void
  validateUserPassword(password: string): void
  validateInputsUserLogin({ email, password }: IUserLogin): void
}
