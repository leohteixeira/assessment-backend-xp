import { throwError } from '@/tests/utils'
import { ValidationSpy, ValidatorSpy } from '@/tests/validation/mocks'
import { ObjectKeyValidation } from '@/validation/validations'

describe('ObjectKey Validation', () => {
  describe('Validator', () => {
    type SutTypes = {
      sut: ObjectKeyValidation<any>
      validatorSpy: ValidatorSpy
    }

    const makeSut = (): SutTypes => {
      const validatorSpy = new ValidatorSpy()

      const sut = new ObjectKeyValidation(validatorSpy, 'param')
      return {
        sut,
        validatorSpy
      }
    }

    const input = { param: 'value' }

    test('should return an error if Validator returns an error', async () => {
      const { sut, validatorSpy } = makeSut()
      jest.spyOn(validatorSpy, 'validate').mockResolvedValueOnce(
        'error_name'
      )

      const result = await sut.validate(input)

      expect(result).toEqual({ param: 'error_name' })
    })

    test('Should return void if value is undefined', async () => {
      const { sut } = makeSut()

      const result = await sut.validate({ param: undefined })

      expect(result).toBeUndefined()
    })

    test('Should return void if there is no error', async () => {
      const { sut } = makeSut()

      const result = await sut.validate({ param: undefined })

      expect(result).toBeUndefined()
    })

    test('Should throw if Validator throws', async () => {
      const { sut, validatorSpy } = makeSut()
      jest.spyOn(validatorSpy, 'validate').mockImplementationOnce(
        throwError
      )

      const promise = sut.validate(input)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('Validation', () => {
    type SutTypes = {
      sut: ObjectKeyValidation<any>
      validationSpy: ValidationSpy
    }

    const makeSut = (): SutTypes => {
      const validationSpy = new ValidationSpy()

      const sut = new ObjectKeyValidation(validationSpy, 'param')
      return {
        sut,
        validationSpy
      }
    }

    const input = {
      param: {
        value: 'test'
      }
    }

    test('Should return an error object nested', async () => {
      const { sut, validationSpy } = makeSut()
      jest.spyOn(validationSpy, 'validate').mockResolvedValueOnce({
        value: 'error'
      })

      const result = await sut.validate(input)

      expect(result).toEqual({ param: { value: 'error' } })
    })

    test('Should return void if no error were found', async () => {
      const { sut } = makeSut()

      const result = await sut.validate(input)

      expect(result).toBeUndefined()
    })

    test('Should return void if param is undefined', async () => {
      const { sut } = makeSut()

      const result = await sut.validate({ param: undefined })

      expect(result).toBeUndefined()
    })

    test('Should throw if Validation throws', async () => {
      const { sut, validationSpy } = makeSut()
      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(
        throwError
      )

      const promise = sut.validate(input)

      await expect(promise).rejects.toThrow()
    })
  })
})
