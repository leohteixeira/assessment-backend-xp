import { FindProductController } from '@/presentation/controllers'
import { HttpError } from '@/presentation/errors'
import { FindProductSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype } from 'faker'

const mockRequest = (): FindProductController.Request => ({
  productId: datatype.uuid()
})

type SutTypes = {
  sut: FindProductController
  validationSpy: ValidationSpy
  findProductSpy: FindProductSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const findProductSpy = new FindProductSpy()
  const sut = new FindProductController(validationSpy, findProductSpy)

  return {
    sut,
    validationSpy,
    findProductSpy
  }
}

describe('FindProduct Controller', () => {
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
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should call FindProduct with correct values', async () => {
    const { sut, findProductSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(findProductSpy.params).toEqual(request)
  })

  test('Should return ServerError if FindProduct throws', async () => {
    const { sut, findProductSpy } = makeSut()
    jest.spyOn(findProductSpy, 'find').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, findProductSpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.body).toEqual(findProductSpy.result)
    expect(result.statusCode).toEqual(200)
  })
})
