import { Invalidation } from '@/validation/helpers'
import { NumberValidator, NumberValidatorParams } from '@/validation/validators'

const makeSut = (params?: NumberValidatorParams): NumberValidator =>
  new NumberValidator(params)

describe('Number Validator', () => {
  describe('minValue', () => {
    const minValue = 3

    test('Should return invalid to number lower than minValue', async () => {
      const sut = makeSut({ minValue })
      const result = await sut.validate(2)
      expect(result).toEqual(Invalidation.minValue(minValue))
    })

    test('Should return void to number equal or bigger then minValue', async () => {
      const sut = makeSut({ minValue })
      const result = await sut.validate(3)
      expect(result).toBeUndefined()
    })
  })

  describe('maxValue', () => {
    const maxValue = 3

    test('Should return invalid to number bigger then maxValue', async () => {
      const sut = makeSut({ maxValue })
      const result = await sut.validate(4)
      expect(result).toEqual(Invalidation.maxValue(maxValue))
    })

    test('Should return void to number equal or lower then maxValue', async () => {
      const sut = makeSut({ maxValue })
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
