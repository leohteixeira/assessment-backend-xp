import { RequestQuery } from '@/domain/models'
import { FindCategories } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class FindCategoriesController implements Http.Controller {
  constructor(
    private readonly validation: Validation<FindCategoriesController.Request>,
    private readonly findCategories: FindCategories
  ) {}

  async handle(
    request: FindCategoriesController.Request
  ): Promise<Http.Response<FindCategoriesController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.findCategories.find({ query: request })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace FindCategoriesController {
  export type Request = Partial<
    RequestQuery.Search & RequestQuery.Limit & RequestQuery.Page
  >
  export type Response = FindCategories.Result
}
