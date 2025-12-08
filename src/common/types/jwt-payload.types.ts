export interface JwtPayload {
  sub: string;
  email?: string;
  iss: string;
  aud: string[] | string;
  iat: number;
  exp: number;
  [key: string]: unknown;
}
