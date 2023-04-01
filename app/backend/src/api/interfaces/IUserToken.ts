export default interface IUserToken {
  id: number;
  role: string;
}

export interface IJwtToken extends IUserToken {
  iat: number;
  exp: number;
}
