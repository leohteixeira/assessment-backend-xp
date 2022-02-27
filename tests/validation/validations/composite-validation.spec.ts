/* eslint-disable @typescript-eslint/dot-notation */
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'
import { CompositeValidation } from '@/validation/validations'

type SutTypes = {
  sut: CompositeValidation<any>
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy(),
    new ValidationSpy()
  ]

  const sut = new CompositeValidation(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Composite Validation', () => {
  const input = {
    a: 'value',
    b: 'value'
  }

  test('Should return found errors', async () => {
    const { sut, validationSpies } = makeSut()
    jest.spyOn(validationSpies[0], 'validate').mockResolvedValueOnce({
      a: 'errorA'
    })
    jest.spyOn(validationSpies[1], 'validate').mockResolvedValueOnce({
      b: 'errorB'
    })

    const result = await sut.validate(input)

    expect(result['a']).toEqual('errorA')
    expect(result['b']).toEqual('errorB')
  })

  test('Should return void if there are no errors', async () => {
    const { sut } = makeSut()

    const result = await sut.validate(input)

    expect(result).toBeUndefined()
  })

  test('Should throw if Validation throws', async () => {
    const { sut, validationSpies } = makeSut()
    jest.spyOn(validationSpies[2], 'validate').mockImplementationOnce(
      throwError
    )

    const promise = sut.validate(input)

    await expect(promise).rejects.toThrow()
  })
})
