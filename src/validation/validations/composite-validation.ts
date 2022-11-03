import { Validation } from '@/validation/protocols'

export class CompositeValidation<T> implements Validation<T> {
  constructor(private readonly validations: Array<Validation<T>>) {}

  async validate(input: T): Validation.Result<T> {
    let result: Validation.BadParams<T> = {}
    for (const validation of this.validations) {
      const error = await validation.validate(input)

      if (error) {
        result = {
          ...result,
          ...error
        }
      }
    }

    if (Object.keys(result).length) return result
  }
}
