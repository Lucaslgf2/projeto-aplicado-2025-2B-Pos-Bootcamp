export interface IHttpRequest {
  headers?: any
  pathParams?: any
  queryParams?: any
  body?: any
  userAuth?: any
}

export interface IHttpResponse {
  headers?: any
  statusCode: number
  body: any
}
