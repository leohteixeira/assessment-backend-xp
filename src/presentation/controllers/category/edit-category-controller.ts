import { EditCategory } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class EditCategoryController implements Http.Controller {
  constructor(
    private readonly validation: Validation<EditCategoryController.Request>,
    private readonly editCategory: EditCategory
  ) {}

  async handle(
    request: EditCategoryController.Request
  ): Promise<Http.Response<EditCategoryController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.editCategory.edit({
        ...request
      })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace EditCategoryController {
  export type Request = EditCategory.Params
  export type Response = EditCategory.Result
}
