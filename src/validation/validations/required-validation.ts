import { Validation } from '@/validation/protocols'
import { RequiredValidator } from '@/validation/validators'

export class RequiredValidation<T> implements Validation<T> {
  constructor(
    private readonly validator: RequiredValidator,
    private readonly objectKeys: Array<keyof T>
  ) {}

  async validate(input: T): Validation.Result<T> {
    const result: Validation.BadParams<T> = {}
    for (const key of this.objectKeys) {
      const error = await this.validator.validate(input[key])
      if (error) result[key] = error
    }

    if (Object.keys(result).length) return result
  }
}
