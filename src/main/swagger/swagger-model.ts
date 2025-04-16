export type ISwaggerSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object'
export type ISwaggerParameterInType = 'query' | 'header' | 'path' | 'cookie'

export interface ISwaggerParameter {
  name: string
  in: ISwaggerParameterInType
  description?: string
  required: boolean
  schema: ISwaggerSchema
  example: any
  examples?: string[]
}

export interface ISwaggerSchema {
  type: ISwaggerSchemaType
  format?: string
  properties?: Record<string, ISwaggerSchema>
  items?: ISwaggerSchema
  required?: string[]
  enum?: any[]
}
