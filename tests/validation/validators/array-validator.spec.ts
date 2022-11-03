import { Invalidation } from '@/validation/helpers'
import { ArrayValidator, ArrayValidatorParams } from '@/validation/validators'
import { ValidatorSpy } from '@/tests/validation/mocks'

const makeSut = (params?: ArrayValidatorParams): ArrayValidator =>
  new ArrayValidator(params)

describe('Array Validator', () => {
  describe('itemValidator', () => {
    const validatorSpy = new ValidatorSpy()
    jest.spyOn(validatorSpy, 'validate').mockImplementation(async (item) => {
      if (typeof item !== 'string') return 'error'
    })

    test('Should return invalid if one item is invalid', async () => {
      const sut = makeSut({ itemsValidator: validatorSpy })
      const result = await sut.validate(['string', 1])
      expect(result).toEqual(
        Invalidation.invalidArrayIndex(1, JSON.stringify('error'))
      )
    })

    test('Should return void if all items are valid', async () => {
      const sut = makeSut({ itemsValidator: validatorSpy })
      const result = await sut.validate(['string', 'string'])
      expect(result).toBeUndefined()
    })
  })

  describe('minLength', () => {
    const minLength = 3

    test('Should return invalid to length lower than minLength', async () => {
      const sut = makeSut({ minLength })
      const result = await sut.validate([1, 2])
      expect(result).toEqual(Invalidation.minLength(minLength))
    })

    test('Should return void to length equal or bigger then minLength', async () => {
      const sut = makeSut({ minLength })
      const result = await sut.validate([1, 2, 3])
      expect(result).toBeUndefined()
    })
  })

  describe('maxLength', () => {
    const maxLength = 3

    test('Should return invalid to length bigger then maxLength', async () => {
      const sut = makeSut({ maxLength })
      const result = await sut.validate([1, 2, 3, 4])
      expect(result).toEqual(Invalidation.maxLength(maxLength))
    })

    test('Should return void to length equal or lower then maxLength', async () => {
      const sut = makeSut({ maxLength })
      const result = await sut.validate([1, 2, 3])
      expect(result).toBeUndefined()
    })
  })

  describe('isArray', () => {
    test('Should return invalid if param is not array', async () => {
      const sut = makeSut()
      const result = await sut.validate('string')
      expect(result).toEqual(Invalidation.pattern())
    })

    test('Should return void if param is array', async () => {
      const sut = makeSut()
      const result = await sut.validate([])
      expect(result).toBeUndefined()
    })
  })
})
