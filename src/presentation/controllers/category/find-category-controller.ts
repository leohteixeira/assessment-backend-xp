import { FindCategory } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class FindCategoryController implements Http.Controller {
  constructor(
    private readonly validation: Validation<FindCategoryController.Request>,
    private readonly findCategory: FindCategory
  ) {}

  async handle(
    request: FindCategoryController.Request
  ): Promise<Http.Response<FindCategoryController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.findCategory.find({
        categoryId: request.categoryId
      })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace FindCategoryController {
  export type Request = FindCategory.Params
  export type Response = FindCategory.Result
}
