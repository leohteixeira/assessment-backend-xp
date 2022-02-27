import { Validation, Validator } from '@/validation/protocols'

export class ObjectKeyValidation<T> implements Validation {
  constructor (
    private readonly validator: Validator<T> | Validation<T[keyof T]>,
    private readonly objectKey: keyof T
  ) {}

  async validate (input: T): Validation.Result<T> {
    if (input[this.objectKey] === undefined) return
    const error = await this.validator.validate(input[this.objectKey])
    if (error) return { [this.objectKey]: error } as any
  }
}
