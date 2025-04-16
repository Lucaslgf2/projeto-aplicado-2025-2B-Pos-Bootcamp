export interface IAuthToken {
  signToken: (payloadData: string | Buffer | object, expiresIn: number) => Promise<string>
  verifyToken: (token: string) => Promise<Record<string, any>>
}
