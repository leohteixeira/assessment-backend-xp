import { OpenAPIV3 } from 'openapi-types'

export const error: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    message: {
      type: 'string'
    },
    error: {
      type: 'string'
    },
    statusCode: {
      type: 'number'
    }
  }
}
