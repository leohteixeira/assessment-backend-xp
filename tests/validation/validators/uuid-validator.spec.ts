import { Invalidation } from '@/validation/helpers'
import { UuidValidator } from '@/validation/validators'

const makeSut = (): UuidValidator => new UuidValidator()

describe('UUID Validator', () => {
  test.each([
    'a',
    'eafrae2351325',
    '4c71254c-6e94-474b-bddf-e8cfe5d804e'
  ])('Should return pattern error if param is not a valid uuid', async (uuid) => {
    const sut = makeSut()
    const result = await sut.validate(uuid)
    expect(result).toEqual(Invalidation.pattern())
  })

  test('Should return void if param is a valid uuid', async () => {
    const sut = makeSut()
    const result = await sut.validate('4c71254c-6e94-474b-bddf-e8cfe5d804e9')
    expect(result).toBeUndefined()
  })
})
