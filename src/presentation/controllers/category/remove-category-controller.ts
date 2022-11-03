import { RemoveCategory } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { noContent } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class RemoveCategoryController implements Http.Controller {
  constructor(
    private readonly validation: Validation<RemoveCategoryController.Request>,
    private readonly removeCategory: RemoveCategory
  ) {}

  async handle(
    request: RemoveCategoryController.Request
  ): Promise<Http.Response<RemoveCategoryController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      await this.removeCategory.remove(request)

      return noContent()
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace RemoveCategoryController {
  export type Request = RemoveCategory.Params
  export type Response = RemoveCategory.Result
}
