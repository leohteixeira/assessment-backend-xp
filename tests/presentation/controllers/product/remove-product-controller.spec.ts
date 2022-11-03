import { HttpError } from '@/presentation/errors'
import { RemoveProductController } from '@/presentation/controllers'
import { RemoveProductSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype } from 'faker'

const mockRequest = (): RemoveProductController.Request => ({
  productId: datatype.uuid()
})

type SutTypes = {
  sut: RemoveProductController
  validationSpy: ValidationSpy
  removeProductSpy: RemoveProductSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const removeProductSpy = new RemoveProductSpy()
  const sut = new RemoveProductController(validationSpy, removeProductSpy)

  return {
    sut,
    validationSpy,
    removeProductSpy
  }
}

describe('RemoveProduct Controller', () => {
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

  test('Should call RemoveProduct with correct values', async () => {
    const { sut, removeProductSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(removeProductSpy.params).toEqual({
      productId: request.productId
    })
  })

  test('Should return ServerError if RemoveProduct throws', async () => {
    const { sut, removeProductSpy } = makeSut()
    jest.spyOn(removeProductSpy, 'remove').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return noContent if request is succeeded', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.statusCode).toEqual(204)
  })
})
