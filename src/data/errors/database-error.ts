import { IdentifiedError } from '@/domain/errors'

export namespace DatabaseError {
  abstract class DatabaseError extends IdentifiedError {
    constructor (name: string, message: string) {
      super('DatabaseError', name, message)
    }
  }

  export class InsertFail extends DatabaseError {
    constructor (message = 'Database document insert failed') {
      super('InsertFail', message)
    }
  }

  export class NotFound extends DatabaseError {
    constructor (message = 'Database document not found') {
      super('NotFound', message)
    }
  }

  export class UpdateFail extends DatabaseError {
    constructor (message = 'Database document update failed') {
      super('UpdateFail', message)
    }
  }
}
