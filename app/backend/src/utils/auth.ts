import * as jwt from 'jsonwebtoken';
import IUserToken, { IJwtToken } from '../api/interfaces/IUserToken';
import TokenErrors from '../api/Errors/tokenErrors';

export default class AuthenticatorJWT {
  private _secret: string;
  // https://www.programcreek.com/typescript/?api=jsonwebtoken.SignOptions
  private _jwtConfig: jwt.SignOptions;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'secret';
    this._jwtConfig = {
      expiresIn: '30d',
      algorithm: 'HS256',
    };
  }

  public generateToken({ id, role }: IUserToken) {
    const token = jwt.sign({ id, role }, this._secret, this._jwtConfig);
    return token;
  }

  public validateToken(token: string): IJwtToken {
    try {
      return jwt.verify(token, this._secret) as IJwtToken;
    } catch (error) {
      throw new TokenErrors('Token must be a valid token');
    }
  }
}
