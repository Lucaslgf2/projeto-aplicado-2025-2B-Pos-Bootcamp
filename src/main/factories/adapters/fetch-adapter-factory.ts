import { IHttpClient } from '@/domain/interfaces/http-client/http-client-interface'
import { FetchAdapter } from '@/infra/adapters/http-client/fetch-adapter'

export const makeFetchAdapter = (): IHttpClient => {
  return new FetchAdapter()
}
