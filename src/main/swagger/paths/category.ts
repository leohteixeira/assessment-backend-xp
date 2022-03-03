import { OpenAPIV3 } from 'openapi-types'

export const addCategoryPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Categories'],
    summary: 'Adds a new category',
    description: 'This route adds a new category',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              code: {
                type: 'string'
              },
              name: {
                type: 'string'
              }
            },
            required: ['name', 'code']
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
              $ref: '#/schemas/category'
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
