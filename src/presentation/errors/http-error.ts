import { IdentifiedError } from '@/domain/errors'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export namespace HttpError {
  abstract class HttpError extends IdentifiedError implements Http.Response {
    body: any
    passing?: IdentifiedError

    constructor(
      public readonly statusCode: number,
      public readonly name: string,
      public readonly message: string
    ) {
      super('HttpError', name, message)

      this.body = {
        name,
        message
      }
    }

    pass(e: IdentifiedError): HttpError {
      this.passing = e
      this.body = {
        ...this.body,
        type: e.name,
        message: e.message
      }
      return this
    }
  }

  export class BadRequest<T> extends HttpError {
    constructor(public readonly badParams: Validation.BadParams<T>) {
      super(400, 'BadRequest', 'Invalid request params')
      this.body.badParams = badParams
    }
  }

  export class Server extends HttpError {
    constructor(message = 'Internal server error, try again later') {
      super(500, 'ServerError', message)
    }
  }
}
