import { OpenAPIV3 } from 'openapi-types'

export const badRequest: OpenAPIV3.ResponseObject = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      },
      example: {
        error: 'BadRequest',
        message: 'Invalid request params',
        badParams: {
          param: 'string'
        }
      }
    }
  }
}
