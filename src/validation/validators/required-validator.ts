import { Invalidation } from '@/validation/helpers'
import { Validator } from '@/validation/protocols'

export class RequiredValidator implements Validator {
  async validate (input: any): Promise<void | string> {
    if (input === undefined) return Invalidation.required()
  }
}
