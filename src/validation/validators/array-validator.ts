import { Invalidation } from '@/validation/helpers'
import { Validation, Validator } from '@/validation/protocols'

export type ArrayValidatorParams = {
  itemsValidator?: Validator | Validation
  minLength?: number
  maxLength?: number
}

export class ArrayValidator implements Validator {
  constructor (private readonly params: ArrayValidatorParams = {}) {}

  async validate (array: any): Promise<void | string> {
    if (!Array.isArray(array)) {
      return Invalidation.pattern()
    }
    if (this.params.minLength) {
      if (array.length < this.params.minLength) { return Invalidation.minLength(this.params.minLength) }
    }
    if (this.params.maxLength) {
      if (array.length > this.params.maxLength) { return Invalidation.maxLength(this.params.maxLength) }
    }
    if (this.params.itemsValidator) {
      for (let index = 0; index < array.length; index++) {
        const error = await this.params.itemsValidator.validate(
          array[index]
        )
        if (error) {
          return Invalidation.invalidArrayIndex(
            index,
            JSON.stringify(error)
          )
        }
      }
    }
  }
}
