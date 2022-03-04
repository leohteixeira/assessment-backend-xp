import { FindCategoryController } from '@/presentation/controllers'
import { HttpError } from '@/presentation/errors'
import { FindCategorySpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype } from 'faker'

const mockRequest = (): FindCategoryController.Request => ({
  categoryId: datatype.uuid()
})

type SutTypes = {
  sut: FindCategoryController
  validationSpy: ValidationSpy
  findCategorySpy: FindCategorySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const findCategorySpy = new FindCategorySpy()
  const sut = new FindCategoryController(validationSpy, findCategorySpy)

  return {
    sut,
    validationSpy,
    findCategorySpy
  }
}

describe('FindCategory Controller', () => {
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

  test('Should call FindCategory with correct values', async () => {
    const { sut, findCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(findCategorySpy.params).toEqual(request)
  })

  test('Should return ServerError if FindCategory throws', async () => {
    const { sut, findCategorySpy } = makeSut()
    jest.spyOn(findCategorySpy, 'find').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, findCategorySpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.body).toEqual(findCategorySpy.result)
    expect(result.statusCode).toEqual(200)
  })
})
