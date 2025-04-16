/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters -- Motivo: blablabla */
/* eslint-disable guard-for-in -- Motivo: blablabla */

import { makeEnvVariables } from '@/main/config/env-variables'
import { ISwaggerParameter, ISwaggerSchema, ISwaggerSchemaType } from './swagger-model'

export const generateSwaggerServerUrl = (): { url: string; description: string } | undefined => {
  const {
    node: { env },
    app: { url }
  } = makeEnvVariables()

  return {
    url,
    description: `Ambiente: ${env.toUpperCase()}`
  }
}

function resolveType(value: any): ISwaggerSchemaType {
  const result = Array.isArray(value) ? 'array' : typeof value
  if (result === 'bigint') {
    return 'integer'
  }
  if (result === 'undefined' || result === 'symbol' || result === 'function') {
    return 'object'
  }
  return result
}

export function generateSwaggerSchema<T>(interfaceType: T): ISwaggerSchema {
  const type = resolveType(interfaceType)
  const result: ISwaggerSchema = {
    type,
    properties: type === 'object' ? {} : undefined,
    items: Array.isArray(interfaceType) ? generateSwaggerSchema(interfaceType[0]) : undefined
  }
  if (type === 'object') {
    for (const key of Object.keys(interfaceType as object)) {
      if (result.properties) {
        result.properties[key] = { type: resolveType((interfaceType as any)[key]) }
      }
    }
  }
  return result
}

export function generateSwaggerParameters<T>(interfaceType: T, headerParams: Record<string, any>, pathParams?: Record<string, any>, requireFields?: string[]): ISwaggerParameter[] {
  const result: ISwaggerParameter[] = []
  const listParams = { ...interfaceType, ...headerParams, ...pathParams }
  for (const key in listParams) {
    const isHeaderParam = Object.prototype.hasOwnProperty.call(headerParams, key)
    const isPathParam = Object.prototype.hasOwnProperty.call(pathParams, key)
    result.push({
      name: key,
      in: isHeaderParam ? 'header' : isPathParam ? 'path' : 'query',
      required: !!requireFields?.includes(key),
      schema: generateSwaggerSchema(listParams[key]),
      example: listParams[key]
    })
  }
  return result
}
