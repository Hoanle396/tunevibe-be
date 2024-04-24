export interface JwtPayload {
  email: string;
  id: number;
  expiration?: Date;
}
