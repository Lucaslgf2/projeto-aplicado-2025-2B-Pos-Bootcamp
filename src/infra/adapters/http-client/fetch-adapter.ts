import { IHttpClient, NsHttpClient } from '@/domain/interfaces/http-client/http-client-interface'

export class FetchAdapter implements IHttpClient {
  async request(data: NsHttpClient.Request): Promise<NsHttpClient.Response> {
    try {
      let url = data.url

      if (data.queryParams) {
        const queryString = new URLSearchParams(data.queryParams).toString()
        url = `${url}?${queryString}`
      }

      const response = await fetch(url, {
        method: data.method,
        headers: data.headers,
        body: data.body ? JSON.stringify(data.body) : undefined
      })

      const responseBody = await response.json()

      return {
        statusCode: response.status,
        body: responseBody
      }
    } catch (error: any) {
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        return { statusCode: 500, body: error.message }
      } else {
        return { statusCode: 500, body: 'Unknown Error' }
      }
    }
  }
}
