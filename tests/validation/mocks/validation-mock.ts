import { Validation } from '@/validation/protocols'

export class ValidationSpy implements Validation {
  input: any
  result = null

  async validate (input: any): Validation.Result<any> {
    this.input = input
    return this.result
  }
}
