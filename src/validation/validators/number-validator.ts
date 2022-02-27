import { Invalidation } from '@/validation/helpers'
import { Validator } from '@/validation/protocols'

export type NumberValidatorParams = {
  minLength?: number
  maxLength?: number
}

export class NumberValidator implements Validator {
  constructor (private readonly params: NumberValidatorParams = {}) {}

  async validate (input: any): Promise<void | string> {
    if (typeof input !== 'number') {
      return Invalidation.type()
    }
    if (this.params.minLength) {
      if (input < this.params.minLength) { return Invalidation.minLength(this.params.minLength) }
    }
    if (this.params.maxLength) {
      if (input > this.params.maxLength) { return Invalidation.maxLength(this.params.maxLength) }
    }
  }
}
