import IInputsValidations from '../api/interfaces/IInputsValidation';
import UnauthorizedError from '../api/Errors/unauthorizedError';
import IUserLogin from '../api/interfaces/IUserLogin';

export default class InputsLoginValidations implements IInputsValidations {
  validateUserEmail = (userEmail: string): void => {
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegExp.test(userEmail)) throw new UnauthorizedError();
  };

  validateUserPassword = (userPassword: string): void => {
    if (userPassword.length < 6) throw new UnauthorizedError();
  };

  validateInputsUserLogin({ email, password }: IUserLogin): void {
    if (!email || !password) throw new UnauthorizedError();
    this.validateUserEmail(email);
    this.validateUserPassword(password);
  }
}
