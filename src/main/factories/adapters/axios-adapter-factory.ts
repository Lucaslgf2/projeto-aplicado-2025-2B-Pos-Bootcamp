import { IHttpClient } from '@/domain/interfaces/http-client/http-client-interface'
import { AxiosAdapter } from '@/infra/adapters/http-client/axios-adapter'

export const makeAxiosAdapter = (): IHttpClient => {
  return new AxiosAdapter()
}
