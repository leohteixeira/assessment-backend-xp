import { OpenAPIV3 } from 'openapi-types'

export const category: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    },
    updatedAt: {
      type: 'string'
    }
  },
  required: ['id', 'name', 'code', 'createdAt', 'updatedAt']
}
