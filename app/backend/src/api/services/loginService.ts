import { ModelStatic } from 'sequelize';
import IUserLogin from '../interfaces/IUserLogin';
import UsersModel from '../../database/models/UsersModel';

export default class loginService {
  private _model: ModelStatic<UsersModel> = UsersModel;

  async login({ email, password }: IUserLogin): Promise<UsersModel | null> {
    if (!email || !password) throw new Error('All fields must be filled');
    const user = await this._model.findOne({ where: { email } });
    if (!user) throw new Error('Unauthorized');
    return user;
  }
}
