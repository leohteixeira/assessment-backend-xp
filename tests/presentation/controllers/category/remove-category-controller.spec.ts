import { HttpError } from '@/presentation/errors'
import { RemoveCategoryController } from '@/presentation/controllers'
import { RemoveCategorySpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype } from 'faker'

const mockRequest = (): RemoveCategoryController.Request => ({
  categoryId: datatype.uuid()
})

type SutTypes = {
  sut: RemoveCategoryController
  validationSpy: ValidationSpy
  removeCategorySpy: RemoveCategorySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const removeCategorySpy = new RemoveCategorySpy()
  const sut = new RemoveCategoryController(validationSpy, removeCategorySpy)

  return {
    sut,
    validationSpy,
    removeCategorySpy
  }
}

describe('RemoveCategory Controller', () => {
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

  test('Should call RemoveCategory with correct values', async () => {
    const { sut, removeCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(removeCategorySpy.params).toEqual({
      categoryId: request.categoryId
    })
  })

  test('Should return ServerError if RemoveCategory throws', async () => {
    const { sut, removeCategorySpy } = makeSut()
    jest.spyOn(removeCategorySpy, 'remove').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return noContent if request is succeeded', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.statusCode).toEqual(204)
  })
})
