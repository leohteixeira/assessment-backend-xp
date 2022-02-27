/* eslint-disable no-tabs */
import { Invalidation } from '@/validation/helpers'
import { TypeValidator } from '@/validation/validators'

const makeSut = (type: string, acceptable: any[]): TypeValidator =>
  new TypeValidator(type, acceptable)

describe('Type Validator', () => {
  test.each`
		input                   | type        | acceptable
		${1}                    | ${'number'} | ${undefined}
		${1}                    | ${'number'} | ${[1, 2, 3]}
		${'value'}              | ${'string'} | ${undefined}
		${'value'}              | ${'string'} | ${['value', 'other_value']}
		${Buffer.from('value')} | ${'object'} | ${undefined}
	`(
    'Should return void to input $input, type $type, acceptable $acceptable',
    async ({ input, type, acceptable }) => {
      const sut = makeSut(type, acceptable)
      const result = await sut.validate(input)
      expect(result).toBeUndefined()
    }
  )

  test.each`
		input      | type        | acceptable
		${1}       | ${'string'} | ${undefined}
		${1}       | ${'number'} | ${[2, 3]}
		${'value'} | ${'number'} | ${undefined}
		${'value'} | ${'string'} | ${['other_value']}
	`(
    'Should return invalidation type to input $input, type $type, acceptable $acceptable',
    async ({ input, type, acceptable }) => {
      const sut = makeSut(type, acceptable)
      const result = await sut.validate(input)
      expect(result).toEqual(Invalidation.type())
    }
  )
})
