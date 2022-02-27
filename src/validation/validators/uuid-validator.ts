import { Invalidation } from '@/validation/helpers'
import { Validator } from '@/validation/protocols'

import validator from 'validator'

export class UuidValidator implements Validator {
  async validate (uuid: string): Promise<void | string> {
    if (!validator.isUUID(uuid, 4)) return Invalidation.pattern()
  }
}
