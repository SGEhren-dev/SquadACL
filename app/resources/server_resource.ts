import Server from '#models/server'
import BaseResource from './base_resource.js'

export default class ServerResource extends BaseResource<Server> {
  public make(): object | object[] {
    return {
      id: this.resource.id,
      name: this.resource.name,
    }
  }
}
