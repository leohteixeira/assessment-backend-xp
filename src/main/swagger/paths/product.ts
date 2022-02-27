import { OpenAPIV3 } from 'openapi-types'

export const productsPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Products'],
    summary: 'Adds a new product',
    description: 'This route adds a new product',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
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
              categoryId: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            },
            required: ['name', 'sku', 'price', 'description', 'quantity']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/product'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
