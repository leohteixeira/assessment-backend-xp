import { throwError } from '@/tests/utils'
import { ValidatorSpy } from '@/tests/validation/mocks/validator-mock'
import { RequiredValidation } from '@/validation/validations'

type SutTypes = {
  sut: RequiredValidation<any>
  validatorSpy: ValidatorSpy
  validationObject: object
}

const makeSut = (): SutTypes => {
  const validationObject = {
    email: 'mail@mail.com'
  }
  const validatorSpy = new ValidatorSpy()

  const sut = new RequiredValidation<typeof validationObject>(validatorSpy, [
    'email'
  ])
  return {
    sut,
    validatorSpy,
    validationObject
  }
}

describe('Required Validation', () => {
  test('Should return an error if Validator returns an error', async () => {
    const { sut, validatorSpy, validationObject } = makeSut()

    jest.spyOn(validatorSpy, 'validate').mockResolvedValueOnce('required')

    const result = await sut.validate(validationObject)

    expect(result).toEqual({ email: 'required' })
  })

  test('Should return void if there are no errors', async () => {
    const { sut, validationObject } = makeSut()

    const result = await sut.validate(validationObject)

    expect(result).toBeUndefined()
  })

  test('Should throw if Validator throws', async () => {
    const { sut, validatorSpy, validationObject } = makeSut()

    jest.spyOn(validatorSpy, 'validate').mockImplementationOnce(throwError)

    const promise = sut.validate(validationObject)

    await expect(promise).rejects.toThrow()
  })
})
