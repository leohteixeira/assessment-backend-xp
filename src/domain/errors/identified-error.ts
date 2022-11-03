export abstract class IdentifiedError extends Error {
  constructor(
    public readonly type: string,
    public readonly name: string,
    public readonly message: string
  ) {
    super(message)
  }
}
