/* eslint-disable valid-typeof */
import { Invalidation } from '@/validation/helpers'
import { Validator } from '@/validation/protocols'

export class TypeValidator implements Validator {
  constructor(
    private readonly type: string,
    private readonly acceptableValues?: any[]
  ) {}

  async validate(input: any): Promise<void | string> {
    if (typeof input !== this.type) return Invalidation.type()
    if (this.acceptableValues) {
      for (const acceptableValue of this.acceptableValues) {
        if (input === acceptableValue) return
      }
      return Invalidation.type()
    }
  }
}
