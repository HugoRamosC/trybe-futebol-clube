import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import AuthenticatorJWT from '../../utils/auth';
import IUserLogin from '../interfaces/IUserLogin';
import UsersModel from '../../database/models/UsersModel';
import UnauthorizedError from '../Errors/unauthorizedError';

export default class loginService {
  private _model: ModelStatic<UsersModel> = UsersModel;

  async login({ email, password }: IUserLogin): Promise<string | null> {
    const user = await this._model.findOne({ where: { email } });
    if (!user) throw new UnauthorizedError();

    const authorizedAccess = bcrypt.compareSync(password, user?.password);
    if (!authorizedAccess) throw new UnauthorizedError();

    const token = new AuthenticatorJWT().generateToken(user);
    console.log('>>>>>', token);

    return token;
  }
}
