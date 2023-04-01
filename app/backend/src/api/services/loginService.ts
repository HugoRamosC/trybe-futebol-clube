import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import AuthenticatorJWT from '../../utils/auth';
import IUserLogin from '../interfaces/IUserLogin';
import UsersModel from '../../database/models/UsersModel';
import UnauthorizedError from '../Errors/unauthorizedError';
import InputsLoginValidations from '../../utils/userValidation';

export default class loginService {
  private _model: ModelStatic<UsersModel>;
  private _inputsValidations: InputsLoginValidations;

  constructor(inputsValidations: InputsLoginValidations) {
    this._model = UsersModel;
    this._inputsValidations = inputsValidations;
  }

  async login({ email, password }: IUserLogin): Promise<string | null> {
    this._inputsValidations.validateInputsUserLogin({ email, password });

    const user = await this._model.findOne({ where: { email } });
    if (!user) throw new UnauthorizedError();

    const authorizedAccess = bcrypt.compareSync(password, user?.password);
    if (!authorizedAccess) throw new UnauthorizedError();

    const token = new AuthenticatorJWT().generateToken(user);
    return token;
  }
}
