import { Invalidation } from '@/validation/helpers'
import { NumberValidator, NumberValidatorParams } from '@/validation/validators'

const makeSut = (params?: NumberValidatorParams): NumberValidator => new NumberValidator(params)

describe('Number Validator', () => {
  describe('minLength', () => {
    const minLength = 3

    test('Should return invalid to number lower than minLength', async () => {
      const sut = makeSut({ minLength })
      const result = await sut.validate(2)
      expect(result).toEqual(Invalidation.minLength(minLength))
    })

    test('Should return void to number equal or bigger then minLength', async () => {
      const sut = makeSut({ minLength })
      const result = await sut.validate(3)
      expect(result).toBeUndefined()
    })
  })

  describe('maxLength', () => {
    const maxLength = 3

    test('Should return invalid to number bigger then maxLength', async () => {
      const sut = makeSut({ maxLength })
      const result = await sut.validate(4)
      expect(result).toEqual(Invalidation.maxLength(maxLength))
    })

    test('Should return void to number equal or lower then maxLength', async () => {
      const sut = makeSut({ maxLength })
      const result = await sut.validate(3)
      expect(result).toBeUndefined()
    })
  })

  describe('is number', () => {
    test('Should return invalid if param is not a number', async () => {
      const sut = makeSut()
      const result = await sut.validate('10')
      expect(result).toEqual(Invalidation.type())
    })

    test('Should return void if param is a number', async () => {
      const sut = makeSut()
      const result = await sut.validate(10)
      expect(result).toBeUndefined()
    })
  })
})
