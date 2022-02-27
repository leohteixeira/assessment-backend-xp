import { OpenAPIV3 } from 'openapi-types'

export const product: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    sku: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    description: {
      type: 'string'
    },
    quantity: {
      type: 'number'
    },
    createdAt: {
      type: 'string'
    },
    updatedAt: {
      type: 'string'
    }
  },
  required: ['id', 'name', 'sku', 'price', 'description', 'quantity', 'createdAt', 'updatedAt']
}
