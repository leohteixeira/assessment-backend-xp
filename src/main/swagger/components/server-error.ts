import { OpenAPIV3 } from 'openapi-types'

export const serverError: OpenAPIV3.ResponseObject = {
  description: 'Server Error',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      },
      example: {
        error: 'ServerError',
        message: 'Internal server error, try again later'
      }
    }
  }
}
