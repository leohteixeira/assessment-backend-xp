import { Validator } from '@/validation/protocols'

export class ValidatorSpy implements Validator {
  async validate (params: Validator.Params<any>): Validator.Result {

  }
}
