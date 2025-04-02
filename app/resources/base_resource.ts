export default abstract class BaseResource<T extends object> {
  constructor(protected resource: T) {
    //
  }

  public abstract make(): object | object[]
}
