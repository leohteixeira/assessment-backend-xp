import { Invalidation } from '@/validation/helpers'
import { RequiredValidator } from '@/validation/validators'

const makeSut = (): RequiredValidator => new RequiredValidator()

describe('Required Validator', () => {
  test('Should return invalidation required', async () => {
    const sut = makeSut()
    const result = await sut.validate(undefined)
    expect(result).toEqual(Invalidation.required())
  })

  test.each([{}, [], 'string', 10, null])(
    'Should return pattern void',
    async (input) => {
      const sut = makeSut()
      const result = await sut.validate(input)
      expect(result).toBeUndefined()
    }
  )
})
