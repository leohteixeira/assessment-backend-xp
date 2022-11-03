import { AddCategory } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class AddCategoryController implements Http.Controller {
  constructor(
    private readonly validation: Validation<AddCategoryController.Request>,
    private readonly addCategory: AddCategory
  ) {}

  async handle(
    request: AddCategoryController.Request
  ): Promise<Http.Response<AddCategoryController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.addCategory.add({
        name: request.name,
        code: request.code
      })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace AddCategoryController {
  export type Request = AddCategory.Params
  export type Response = AddCategory.Result
}
