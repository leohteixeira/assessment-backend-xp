import { FindProductsController } from '@/presentation/controllers'
import { HttpError } from '@/presentation/errors'
import { FindProductsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype, random } from 'faker'

const mockRequest = (): FindProductsController.Request => ({
  search: random.word(),
  searchValue: random.word(),
  limit: datatype.number({ min: 1 }),
  page: datatype.number({ min: 1 })
})

type SutTypes = {
  sut: FindProductsController
  validationSpy: ValidationSpy
  findProductsSpy: FindProductsSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const findProductsSpy = new FindProductsSpy()
  const sut = new FindProductsController(validationSpy, findProductsSpy)

  return {
    sut,
    validationSpy,
    findProductsSpy
  }
}

describe('FindProducts Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return BadRequest if validation return invalid params', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockResolvedValueOnce({
      param: 'error'
    })
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.BadRequest)
  })

  test('Should return ServerError if validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(
      throwError
    )
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should call FindProducts with correct values', async () => {
    const { sut, findProductsSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(findProductsSpy.params).toEqual({ query: request })
  })

  test('Should return ServerError if FindProducts throws', async () => {
    const { sut, findProductsSpy } = makeSut()
    jest.spyOn(findProductsSpy, 'find').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, findProductsSpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.body).toEqual(findProductsSpy.result)
    expect(result.statusCode).toEqual(200)
  })
})
