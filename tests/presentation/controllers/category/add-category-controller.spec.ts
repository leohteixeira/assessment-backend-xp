import { HttpError } from '@/presentation/errors'
import { AddCategoryController } from '@/presentation/controllers'
import { AddCategorySpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { random } from 'faker'

const mockRequest = (): AddCategoryController.Request => ({
  name: random.words(),
  code: random.words()
})

type SutTypes = {
  sut: AddCategoryController
  validationSpy: ValidationSpy
  addCategorySpy: AddCategorySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addCategorySpy = new AddCategorySpy()
  const sut = new AddCategoryController(validationSpy, addCategorySpy)

  return {
    sut,
    validationSpy,
    addCategorySpy
  }
}

describe('AddCategory Controller', () => {
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

  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCategorySpy.params).toEqual({
      name: request.name,
      code: request.code
    })
  })

  test('Should return ServerError if AddCategory throws', async () => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, addCategorySpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(addCategorySpy.result)
  })
})
