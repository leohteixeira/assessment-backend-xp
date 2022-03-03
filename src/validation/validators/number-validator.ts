import { Invalidation } from '@/validation/helpers'
import { Validator } from '@/validation/protocols'

export type NumberValidatorParams = {
  minValue?: number
  maxValue?: number
}

export class NumberValidator implements Validator {
  constructor (private readonly params: NumberValidatorParams = {}) {}

  async validate (input: any): Promise<void | string> {
    if (typeof input !== 'number') {
      return Invalidation.type()
    }
    if (this.params.minValue) {
      if (input < this.params.minValue) { return Invalidation.minValue(this.params.minValue) }
    }
    if (this.params.maxValue) {
      if (input > this.params.maxValue) { return Invalidation.maxValue(this.params.maxValue) }
    }
  }
}
