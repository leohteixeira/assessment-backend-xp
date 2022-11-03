import { RequestQuery } from '@/domain/models'
import { FindProducts } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class FindProductsController implements Http.Controller {
  constructor(
    private readonly validation: Validation<FindProductsController.Request>,
    private readonly findProducts: FindProducts
  ) {}

  async handle(
    request: FindProductsController.Request
  ): Promise<Http.Response<FindProductsController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.findProducts.find({ query: request })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace FindProductsController {
  export type Request = Partial<
    RequestQuery.Search & RequestQuery.Limit & RequestQuery.Page
  >
  export type Response = FindProducts.Result
}
